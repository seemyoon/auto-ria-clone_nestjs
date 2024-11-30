import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { IsNull, Not } from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { SubscribeEntity } from '../../../database/entities/subscribe.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { PasswordService } from '../../auth/services/password.service';
import { FileTypeEnum } from '../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../file-storage/services/file-storage.service';
import { RefreshTokenRepository } from '../../repository/service/refresh-token.repository';
import { SubscribeRepository } from '../../repository/service/subscribe.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { BannedEnum } from '../enum/banned.enum';
import { UserEnum } from '../enum/users.enum';
import { CreateUserReqUserDto } from '../models/req/create-user-req-user.dto';
import { ListSubscriptionsQueryDto } from '../models/req/list-subscriptions.query.dto';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UpdateReqUserDto } from '../models/req/update-req-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly passwordService: PasswordService,
  ) {}

  public async getMe(userData: IUserData): Promise<UserEntity> {
    await this.isBanned(userData.userId);
    await this.isDeleted(userData.userId);
    return await this.userRepository.findUser(userData.userId);
  }

  public async getUsers(
    userData: IUserData,
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    await this.isAdminOrManager(userData.userId);
    return await this.userRepository.findAll(query);
  }

  public async getSellers(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.findAllSellers(query);
  }

  public async uploadAvatar(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    await this.isBanned(userData.userId);
    await this.isDeleted(userData.userId);
    const seller = await this.userRepository.findOneBy({ id: userData.userId });
    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      userData.userId,
    );
    if (seller.image) {
      await this.fileStorageService.deleteFile(seller.image);
    }
    await this.userRepository.save({ ...seller, image: filePath });
  }

  public async deleteAvatar(userData: IUserData): Promise<void> {
    await this.isBanned(userData.userId);
    await this.isDeleted(userData.userId);
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (user.image) {
      await this.fileStorageService.deleteFile(user.image);
      await this.userRepository.save({ ...user, image: null });
    }
  }

  public async editMe(
    userData: IUserData,
    dto: UpdateReqUserDto,
  ): Promise<UserEntity> {
    await this.isBanned(userData.userId);
    await this.isDeleted(userData.userId);
    return await this.returnedUpdatedUserOrThrow(userData.userId, dto);
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    await this.isBanned(userData.userId);
    await this.isDeleted(userData.userId);
    await this.userRepository.update(
      { id: userData.userId },
      { deleted: new Date() },
    );
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
  }

  public async getSeller(userId: UserID): Promise<UserEntity> {
    return await this.returnedUserOrThrow(userId);
  }

  public async banOrUnbanUser(
    userId: UserID,
    isBanned: BannedEnum,
    userData: IUserData,
  ): Promise<void> {
    await this.isAdminOrManager(userData.userId);
    const user = await this.returnedUserOrThrow(userId);

    if (![UserEnum.ADMIN, UserEnum.MANAGER].includes(user.role)) {
      throw new ConflictException('You can not ban');
    }

    user.isBanned = isBanned;
    await this.userRepository.save(user);
  }

  public async subscribe(userData: IUserData): Promise<void> {
    await this.isBanned(userData.userId);
    await this.isDeleted(userData.userId);
    const subscribe = await this.subscribeRepository.findOneBy({
      user_id: userData.userId,
    });
    if (subscribe) {
      throw new ConflictException('You are already subscribed');
    }
    await this.subscribeRepository.save(
      this.subscribeRepository.create({
        user_id: userData.userId,
      }),
    );
  }

  public async unsubscribe(userData: IUserData): Promise<void> {
    await this.isBanned(userData.userId);
    await this.isDeleted(userData.userId);
    const subscribe = await this.subscribeRepository.findOneBy({
      user_id: userData.userId,
    });
    if (!subscribe) {
      throw new ConflictException('You have not subscribe yet');
    }
    await this.subscribeRepository.remove(subscribe);
  }

  public async createUser(
    userData: IUserData,
    dto: CreateUserReqUserDto,
  ): Promise<UserEntity> {
    if (dto.role === UserEnum.SELLER) {
      await this.isAdminOrManager(userData.userId);
    }
    if (
      dto.role === UserEnum.MANAGER ||
      dto.role === UserEnum.ADMIN ||
      dto.role === UserEnum.DEALERSHIP_ADMIN
    ) {
      await this.isAdmin(userData.userId);
    }
    const password = await this.passwordService.hashPassword(dto.password, 10);
    await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );

    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ['id', 'password', 'isTemporaryPassword'],
    });

    if (
      dto.role === UserEnum.MANAGER ||
      dto.role === UserEnum.ADMIN ||
      dto.role === UserEnum.DEALERSHIP_MANAGER ||
      dto.role === UserEnum.DEALERSHIP_ADMIN
    ) {
      await this.subscribeRepository.save(
        this.subscribeRepository.create({
          user_id: user.id,
        }),
      );
    }

    user.isTemporaryPassword = true;

    await this.userRepository.save(user);
    return user;
  }

  public async getSubscriptions(
    query: ListSubscriptionsQueryDto,
    userData: IUserData,
  ): Promise<[SubscribeEntity[], number]> {
    await this.isAdminOrManager(userData.userId);
    return await this.subscribeRepository.findAll(query);
  }

  private async isBanned(userId: UserID): Promise<void> {
    const ban = await this.userRepository.findOneBy({
      id: userId,
      isBanned: BannedEnum.BANNED,
    });
    if (ban) {
      throw new ConflictException(
        'You are limited in your options because you are banned',
      );
    }
  }

  private async isDeleted(userId: UserID): Promise<void> {
    const isDeleted = await this.userRepository.findOneBy({
      id: userId,
      deleted: Not(IsNull()),
    });
    if (isDeleted) {
      throw new ConflictException(
        'You are limited in your options because you are deleted',
      );
    }
  }

  private async returnedUserOrThrow(userId: UserID): Promise<UserEntity> {
    const user = await this.userRepository.findUser(userId);

    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
  }

  private async isAdminOrManager(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (![UserEnum.ADMIN, UserEnum.MANAGER].includes(user.role)) {
      throw new BadRequestException('you do not have access rights');
    }
  }

  private async isAdmin(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (![UserEnum.ADMIN].includes(user.role)) {
      throw new BadRequestException('You are not an admin');
    }
  }

  private async returnedUpdatedUserOrThrow(
    userId: UserID,
    dto: UpdateReqUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
    if (dto?.name) {
      user.name = dto.name;
    }

    await this.userRepository.save(user);
    return user;
  }
}
