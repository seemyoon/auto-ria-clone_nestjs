import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../common/types/entity-ids.type';
import { BannedEnum } from '../../enum/banned.enum';
import { UserEnum } from '../../enum/users.enum';

export class BaseUserResDto {
  @ApiProperty({ type: String })
  id: UserID;
  name: string;
  email: string;
  image?: string;
  isPremium?: boolean;
  @ApiProperty({ enum: UserEnum, example: UserEnum.SELLER })
  role: UserEnum;
  @ApiProperty({ enum: BannedEnum, example: BannedEnum.NOT_BANNED })
  isBanned?: BannedEnum;
  deleted?: Date;
  created: Date;
  updated: Date;
}
