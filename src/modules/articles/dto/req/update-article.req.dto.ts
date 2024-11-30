import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Length } from 'class-validator';

import { CurrencyEnum } from '../../../price/enum/currency.enum';
import { BaseArticleReqDto } from './article.req.dto';

export class UpdateArticleReqDto extends OmitType(BaseArticleReqDto, []) {
  @IsOptional()
  @ApiProperty({
    example: 'I will sell a car',
  })
  @IsString()
  @Length(3, 50)
  title?: string;

  @IsOptional()
  @ApiProperty({ example: 'Selling a brand new car' })
  @IsString()
  @Length(0, 200)
  description?: string;

  @IsOptional()
  @ApiProperty({
    example:
      'This section contains an in-depth look at some of my favorite dishes. ',
  })
  @IsString()
  @Length(0, 200)
  body?: string;

  @IsOptional()
  @ApiProperty({
    example: 'Toyota',
    description: 'Brand of the car',
  })
  @IsString()
  brand?: string;

  @IsOptional()
  @ApiProperty({
    example: 200000,
    description: 'Price of the car',
  })
  @IsInt()
  cost?: number;

  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @IsOptional()
  @ApiProperty({
    example: 'Kyiv',
    description: 'Region of the car',
  })
  @IsString()
  place?: string;

  @IsOptional()
  @ApiProperty({
    example: 'Corolla',
    description: 'Model of the car',
  })
  @IsString()
  model?: string;
}
