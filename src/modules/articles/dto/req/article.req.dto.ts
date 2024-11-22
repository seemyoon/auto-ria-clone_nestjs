import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { SellerEnum } from '../../../users/enum/seller.enum';

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
    example:
      'This section contains an in-depth look at some of my favorite dishes. ',
  })
  @IsString()
  @Length(0, 200)
  @Transform(TransformHelper.toTrim)
  @Type(() => String)
  body: string;

  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @ApiProperty({
    example: 'Toyota',
    description: 'Brand of the car',
  })
  brand: string;

  @Transform(TransformHelper.toTrim)
  @IsInt()
  @ApiProperty({
    example: 200000,
    description: 'Price of the car',
  })
  cost: number;

  @Transform(TransformHelper.toTrim)
  @IsString()
  region: string;

  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @ApiProperty({
    example: 'Corolla',
    description: 'Model of the car',
  })
  model: string;

  @ApiProperty({ enum: SellerEnum, example: SellerEnum.SELLER })
  sellerType: string;
}