import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from './base-user.req.dto';

export class UpdateReqUserDto extends PickType(BaseUserReqDto, [
  'role',
  'name',
]) {}