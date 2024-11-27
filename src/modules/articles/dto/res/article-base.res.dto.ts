import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { isActiveArticleEnum } from '../../../../database/enums/is-active-article.enum';
import { CarResDto } from '../../../cars/dto/res/car.res.dto';
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

  region?: RegionResDto;

  @Transform(TransformHelper.toTrim)
  @IsInt()
  @ApiProperty({
    example: 200000,
    description: 'Price of the car',
  })
  cost: number;

  @ApiProperty({
    enum: isActiveArticleEnum,
    example: isActiveArticleEnum.ACTIVE,
  })
  status: isActiveArticleEnum;

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

  @ApiProperty({ enum: SellerEnum, example: SellerEnum.SELLER })
  sellerType?: SellerEnum;

  car?: CarResDto;

  // profanityCheck?: boolean;
}
