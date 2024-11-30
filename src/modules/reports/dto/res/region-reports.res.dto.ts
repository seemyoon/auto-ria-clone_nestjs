import { ApiProperty } from '@nestjs/swagger';

import { ReportRegionID } from '../../../../common/types/entity-ids.type';

export class RegionReportsResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Report ID',
  })
  id: ReportRegionID;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Created field',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'Kyiv',
    description: 'Region of the car',
  })
  place: string;
}
