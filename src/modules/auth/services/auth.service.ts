import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { RefreshTokenRepository } from '../../repository/service/refresh-token.repository';
import { SubscribeRepository } from '../../repository/service/subscribe.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UserEnum } from '../../users/enum/users.enum';
import { UserMapper } from '../../users/mapper/user.mapper';
import { IUserData } from '../interfaces/user-data.interface';
import { ChangePasswordReqDto } from '../models/dto/request/change-password.req.dto';
import { ChangeTemporaryPasswordReqDto } from '../models/dto/request/change-temporary-password.req.dto';
import { SignInReqDto } from '../models/dto/request/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/request/sign-up.req.dto';
import { AuthResDto } from '../models/dto/response/auth.res.dto';
import { TokenPairResDto } from '../models/dto/response/token-pair.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async signUp(dto: SignUpReqDto): Promise<AuthResDto> {
    if (![UserEnum.ADMIN, UserEnum.SELLER].includes(dto.role)) {
      throw new BadRequestException('Invalid role');
    }
    if (dto.role === UserEnum.ADMIN) {
      const adminExists = await this.userRepository.count({
        where: { role: UserEnum.ADMIN },
      });
      if (adminExists > 0) {
        throw new BadRequestException('Admin role already exists');
      }
    }
    await this.isEmailNotExistOrThrow(dto.email);
    const password = await this.passwordService.hashPassword(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    if (dto.role === UserEnum.ADMIN) {
      await this.subscribeRepository.save(
        this.subscribeRepository.create({
          user_id: user.id,
        }),
      );
    }

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);

    return { user: UserMapper.toResDto(user), tokens };
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password', 'isTemporaryPassword'],
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.isTemporaryPassword)
      throw new UnauthorizedException(
        'Password is temporary, you must change it',
      );

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        dto.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: dto.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    return { user: UserMapper.toResDto(userEntity), tokens };
  }

  public async logOut(userData: IUserData): Promise<void> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
  }

  public async refreshToken(userData: IUserData): Promise<TokenPairResDto> {
    await Promise.all([
      this.authCacheService.deleteToken(userData.userId, userData.deviceId),
      this.refreshTokenRepository.delete({
        user_id: userData.userId,
        deviceId: userData.deviceId,
      }),
    ]);
    const tokens = await this.tokenService.generateAuthTokens({
      userId: userData.userId,
      deviceId: userData.deviceId,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        userData.userId,
        userData.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: userData.userId,
          deviceId: userData.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
    return tokens;
  }

  // public async forgotPasswordSendEmail(
  //   userData: IUserData,
  //   dto: ForgotPasswordReqDto,
  // ): Promise<void> {
  //   const user = await this.returnedUserOrThrow(userData.userId);
  // }

  public async changePassword(
    userData: IUserData,
    dto: ChangePasswordReqDto,
  ): Promise<void> {
    const user = await this.userRepository.findById(userData.userId);
    if (!user) {
      throw new ConflictException('User not found');
    }
    //todo arr of old passwords to store all previous user passwords,

    const isPrevious = await this.passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (isPrevious) throw new UnauthorizedException('Password already used');

    const password = await this.passwordService.hashPassword(dto.password, 10);

    await this.returnedChangedPasswordOrThrow(userData.userId, password);

    await this.logOut(userData);

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: userData.deviceId,
    });
    await Promise.all([
      this.authCacheService.saveToken(
        tokens.accessToken,
        user.id,
        userData.deviceId,
      ),
      this.refreshTokenRepository.save(
        this.refreshTokenRepository.create({
          user_id: user.id,
          deviceId: userData.deviceId,
          refreshToken: tokens.refreshToken,
        }),
      ),
    ]);
  }

  public async changeTemporaryPassword(
    dto: ChangeTemporaryPasswordReqDto,
  ): Promise<void> {
    await this.isEmailNotExistOrThrow(dto.email);

    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password', 'isTemporaryPassword'],
    });

    const isPrevious = await this.passwordService.comparePassword(
      dto.password,
      user.password,
    );

    if (isPrevious) throw new UnauthorizedException('Password already used');

    const password = await this.passwordService.hashPassword(dto.password, 10);

    await this.returnedChangedPasswordOrThrow(user.id, password);
  }

  private async returnedChangedPasswordOrThrow(
    userId: UserID,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
    if (password) {
      user.password = password;
    }

    if (user.isTemporaryPassword) {
      user.isTemporaryPassword = false;
    }

    await this.userRepository.save(user);
    return user;
  }

  private async isEmailNotExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
  }
}
