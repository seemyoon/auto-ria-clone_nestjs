import { PickType } from '@nestjs/swagger';

import { RegionReqDto } from './region.req.dto';

export class UpdateRegionReqDto extends PickType(RegionReqDto, ['region']) {}
