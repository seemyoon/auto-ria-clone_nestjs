import { IsEnum, IsNotEmpty } from 'class-validator';

import { BannedEnum } from '../../enum/banned.enum';

export class BannedReqUserDto {
  @IsNotEmpty()
  @IsEnum(BannedEnum)
  readonly isBanned: BannedEnum;
}
