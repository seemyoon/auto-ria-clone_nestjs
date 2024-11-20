import { ApiProperty } from '@nestjs/swagger';

export class CostCarResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'CostCar ID',
  })
  id: string;

  region: string;

  cost: number;
}
