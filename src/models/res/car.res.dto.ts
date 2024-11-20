import { ApiProperty } from '@nestjs/swagger';

import { CostCarResDto } from './cost-car.res.dto';

export class CarResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Car ID',
  })
  id: string;

  @ApiProperty({
    example: 'Toyota',
    description: 'Brand of the car',
  })
  brand: string;

  @ApiProperty({
    example: 'Corolla',
    description: 'Model of the car',
  })
  model: string;

  cost?: CostCarResDto;

  @ApiProperty({
    example: null,
    description: 'Deleted timestamp of the car, if deleted',
  })
  deleted?: Date | null;
}
