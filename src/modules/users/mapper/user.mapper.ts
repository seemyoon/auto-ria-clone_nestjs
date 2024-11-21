import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { UserResDto } from '../models/res/user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: `${user.image}`,
      role: user.role,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }
}
