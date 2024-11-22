import { ConflictException, Injectable } from '@nestjs/common';

import { UserEntity } from '../../../../database/entities/user.entity';
import { IUserData } from '../../../auth/interfaces/user-data.interface';
import { RefreshTokenRepository } from '../../../repository/service/refresh-token.repository';
import { SubscribeRepository } from '../../../repository/service/subscribe.repository';
import { UserRepository } from '../../../repository/service/user.repository';
import { BannedEnum } from '../../enum/banned.enum';
import { ListUsersQueryDto } from '../../models/req/list-users.query.dto';
import { UpdateReqUserDto } from '../../models/req/update-req-user.dto';

@Injectable()
export class SellerService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly subscribeRepository: SubscribeRepository,
  ) {}

  //todo permission seller_type DealerShipSeller or UsualSeller
  //todo full logic

  public async getMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async getSellers(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.findAll(query);
  }

  public async editSeller(
    userData: IUserData,
    userId: string,
    dto: UpdateReqUserDto,
  ): Promise<UserEntity> {
    await this.userRepository.update(userId, dto);
    return await this.userRepository.findOneBy({} as UserEntity);
  }

  public async editMe(
    userData: IUserData,
    dto: UpdateReqUserDto,
  ): Promise<UserEntity> {
    await this.userRepository.update(userData.userId, dto);
    return await this.userRepository.findOneBy({} as UserEntity);
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    await this.userRepository.delete({ id: userData.userId } as UserEntity);
  }

  public async getSeller(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({});
  }

  async banOrUnbanUser(userId: string, isBanned: BannedEnum): Promise<void> {
    const user = await this.userRepository.findOneBy({});
    if (user) {
      user.isBanned = isBanned;
      await this.userRepository.save(user);
    }
  }

  public async subscribe(userData: IUserData): Promise<void> {
    //todo logic with expire subscription
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
    const subscribe = await this.subscribeRepository.findOneBy({
      user_id: userData.userId,
    });
    if (!subscribe) {
      throw new ConflictException('You have not subscribe yet');
    }
    await this.subscribeRepository.remove(subscribe);
  }
}
