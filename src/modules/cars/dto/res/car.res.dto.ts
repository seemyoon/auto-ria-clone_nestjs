import { ApiProperty } from '@nestjs/swagger';

import { ArticleSellerResDto } from '../../../articles/dto/res/article-seller.res.dto';
import { CarRegionsResDto } from './cost-car.res.dto';

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

  @ApiProperty({
    example: 200000,
    description: 'Cost of the car',
  })
  cost: number;

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

  region?: CarRegionsResDto[];

  articles?: ArticleSellerResDto[];
}
