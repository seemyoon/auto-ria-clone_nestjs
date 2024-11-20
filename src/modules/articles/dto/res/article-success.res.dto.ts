import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../users/models/res/user.res.dto';
import { CarResDto } from '../../../../models/res/car.res.dto';

export class ArticleSuccessResDto {
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
    example: '2021-09-29T10:00:00.000Z',
    description: 'Created field',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Updated field',
  })
  updated: Date;

  car?: CarResDto;

  isFavourite: boolean;

  sellerType: string;

  profanityCheck?: boolean;

  numberOfViews?: number;

  seller?: UserResDto;
}
