import { PickType } from '@nestjs/swagger';

import { BaseCarReqDto } from './car.req.dto';

export class UpdateCarReqDto extends PickType(BaseCarReqDto, [
  'brand',
  'model',
]) {}
