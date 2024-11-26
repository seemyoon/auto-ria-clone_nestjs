import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/service/refresh-token.repository';
import { SubscribeRepository } from '../../repository/service/subscribe.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UserEnum } from '../../users/enum/users.enum';
import { UserMapper } from '../../users/mapper/user.mapper';
import { IUserData } from '../interfaces/user-data.interface';
import { SignInReqDto } from '../models/dto/request/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/request/sign-up.req.dto';
import { AuthResDto } from '../models/dto/response/auth.res.dto';
import { TokenPairResDto } from '../models/dto/response/token-pair.res.dto';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authCacheService: AuthCacheService,
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly subscribeRepository: SubscribeRepository,
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
    const password = await bcrypt.hash(dto.password, 10);
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
      select: ['id', 'password'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
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

  private async isEmailNotExistOrThrow(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new BadRequestException('Email already exists');
    }
  }
}
