import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class ChangePasswordReqDto extends PickType(BaseAuthReqDto, [
  'password',
]) {}
