import { PickType } from '@nestjs/swagger';

import { BaseUserResDto } from './base-user.res.dto';

export class SellerResDto extends PickType(BaseUserResDto, [
  'id',
  'name',
  'email',
  'password',
  'image',
  'isPremium',
  'role',
  'deleted',
  'created',
  'updated',
]) {}
