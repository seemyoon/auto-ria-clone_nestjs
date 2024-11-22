import { ApiProperty } from '@nestjs/swagger';

export class CarResRegionsDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'CarRegion ID',
  })
  id: string;

  @ApiProperty({
    example: 'Kyiv',
    description: 'Region of the car',
  })
  region: string;
  @ApiProperty({
    example: null,
    description: 'Deleted timestamp of the car, if deleted',
  })
  deleted?: Date | null;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Created field',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Updated field',
  })
  updated: Date;
}
