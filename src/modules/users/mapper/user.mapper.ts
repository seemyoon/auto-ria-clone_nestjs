import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
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

  public static toResDtoList(
    data: UserEntity[],
    total: number,
    query: ListUsersQueryDto,
  ): UsersListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
