import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseArticleReqDto {
  @ApiProperty({
    example: 'I will sell a car',
  })
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  title: string;

  @ApiProperty({ example: 'Selling a brand new car' })
  @IsString()
  @Length(0, 200)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  description: string;

  @ApiProperty({
    example: 'This section contains info about car. ',
  })
  @IsString()
  @Length(0, 200)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  body: string;

  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @ApiProperty({
    example: 'Toyota',
    description: 'Brand of the car',
  })
  brand: string;

  @IsInt()
  @ApiProperty({
    example: 200000,
    description: 'Price of the car',
  })
  cost: number;

  @Type(() => String)
  @IsString()
  @ApiProperty({
    example: 'Kyiv',
    description: 'Region of the car',
  })
  place: string;

  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @ApiProperty({
    example: 'Corolla',
    description: 'Model of the car',
  })
  model: string;
}
