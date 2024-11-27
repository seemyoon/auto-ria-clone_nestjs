import { ApiProperty } from '@nestjs/swagger';

import { RegionID } from '../../../../common/types/entity-ids.type';

export class RegionResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'CarRegion ID',
  })
  id: RegionID;

  @ApiProperty({
    example: 'Kyiv',
    description: 'Region of the car',
  })
  place: string;

  @ApiProperty({
    example: null,
    description: 'When the region was removed',
  })
  deleted?: Date | null;
}
