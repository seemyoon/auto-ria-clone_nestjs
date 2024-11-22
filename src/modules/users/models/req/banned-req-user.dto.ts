import { IsEnum, IsNotEmpty } from 'class-validator';

import { BannedEnum } from '../../enum/banned.enum';
import { BaseUserReqDto } from './base-user.req.dto';

export class BannedReqUserDto extends BaseUserReqDto {
  @IsNotEmpty()
  @IsEnum(BannedEnum)
  readonly isBanned: BannedEnum;
}
