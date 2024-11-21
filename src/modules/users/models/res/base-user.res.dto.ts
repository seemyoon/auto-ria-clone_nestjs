import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../common/types/entity-ids.type';
import { UserEnum } from '../../enum/users.enum';

export class BaseUserResDto {
  @ApiProperty({ type: String })
  id: UserID;
  name: string;
  email: string;
  image?: string;
  isPremium?: boolean;
  role: UserEnum;
  // deleted?: Date;
  isBanned?: boolean;
  // created: Date;
  // updated: Date;
}
