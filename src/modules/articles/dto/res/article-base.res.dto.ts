import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { isActiveArticleEnum } from '../../../../database/enums/is-active-article.enum';
import { CarResDto } from '../../../cars/dto/res/car.res.dto';
import { CurrencyEnum } from '../../../price/enum/currency.enum';
import { RegionResDto } from '../../../region/dto/res/region.res.dto';
import { SellerEnum } from '../../../users/enum/seller.enum';

export class ArticleBaseResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Article ID',
  })
  id: string;

  @ApiProperty({
    example: 'I will sell a car',
    description: 'Title of the article',
  })
  title: string;

  @ApiProperty({
    example: 'Selling a brand new car.',
    description: 'Short description of the article',
  })
  description: string;

  @ApiProperty({
    example: 'This car is in excellent condition with only 10,000 miles.',
    description: 'Main content of the article',
  })
  body: string;

  @ApiProperty({
    description: 'Region associated with the article',
    type: RegionResDto,
    required: false,
  })
  region?: RegionResDto;

  @Transform(TransformHelper.toTrim)
  @IsInt()
  @ApiProperty({
    example: 200000,
    description: 'Price of the car',
  })
  cost: number;

  @IsBoolean()
  @ApiProperty({
    example: true,
  })
  profanityCheck: boolean;

  @IsEnum(CurrencyEnum)
  @ApiProperty({
    enum: CurrencyEnum,
    example: CurrencyEnum.USD,
    description: 'Currency of the price',
  })
  currency: CurrencyEnum;

  @ApiProperty({
    example: 5600000,
    description: 'Price in UAH',
  })
  costUAH: number;

  @ApiProperty({
    example: 28,
    description: 'Currency rate at the time of article creation',
  })
  currencyRate: number;

  @ApiProperty({
    enum: isActiveArticleEnum,
    example: isActiveArticleEnum.ACTIVE,
    description: 'Status of the article',
  })
  status: isActiveArticleEnum;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Creation date of the article',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Last update date of the article',
  })
  updated: Date;

  @ApiProperty({
    enum: SellerEnum,
    example: SellerEnum.SELLER,
    description: 'Type of seller',
  })
  sellerType?: SellerEnum;

  @ApiProperty({
    description: 'Car associated with the article',
    type: CarResDto,
  })
  car?: CarResDto;
}
