import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './base-user.res.dto';

export class AdminResDto extends PickType(BaseUserResDto, [
  'id',
  'name',
  'email',
  'password',
  'image',
  'role',
  'deleted',
  'created',
  'updated',
]) {}
