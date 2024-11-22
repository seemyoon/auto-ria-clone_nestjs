import { PickType } from '@nestjs/swagger';

import { CarRegionReqDto } from './car-region.req.dto';

export class UpdateCarRegionReqDto extends PickType(CarRegionReqDto, [
  'region',
]) {}
