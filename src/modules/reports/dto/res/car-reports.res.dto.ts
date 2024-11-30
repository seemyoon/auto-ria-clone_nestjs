import { ApiProperty } from '@nestjs/swagger';

import { ReportCarID } from '../../../../common/types/entity-ids.type';

export class CarReportsResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Car ID',
  })
  id: ReportCarID;

  @ApiProperty({
    example: 'Toyota',
    description: 'Brand of the car',
  })
  brand: string;

  @ApiProperty({
    example: 'Corolla',
    description: 'Model of the car',
  })
  model?: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Created field',
  })
  created: Date;
}
