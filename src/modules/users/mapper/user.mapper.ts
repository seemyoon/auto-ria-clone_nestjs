import { SubscribeEntity } from '../../../database/entities/subscribe.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListSubscriptionsQueryDto } from '../models/req/list-subscriptions.query.dto';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { SubscriptionResDto } from '../models/res/subscription.res.dto';
import { SubscriptionsListResDto } from '../models/res/subscriptions-list.res.dto';
import { UserResDto } from '../models/res/user.res.dto';
import { UsersListResDto } from '../models/res/users-list.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: `${user.image}`,
      role: user.role,
      created: user.created,
      updated: user.updated,
      isBanned: user.isBanned,
      isPremium: !!user.subscribe,
    };
  }

  public static toResDtoList(
    data: UserEntity[],
    total: number,
    query: ListUsersQueryDto,
  ): UsersListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }

  public static toIUserData(
    user: UserEntity,
    jwtPayload: IJwtPayload,
  ): IUserData {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }

  public static toSubscriptionResDto(
    subscribe: SubscribeEntity,
  ): SubscriptionResDto {
    return {
      id: subscribe.id,
      user_id: subscribe.user_id,
    };
  }

  public static toSubscriptionResDtoList(
    data: SubscribeEntity[],
    total: number,
    query: ListSubscriptionsQueryDto,
  ): SubscriptionsListResDto {
    return { data: data.map(this.toSubscriptionResDto), total, ...query };
  }
}
