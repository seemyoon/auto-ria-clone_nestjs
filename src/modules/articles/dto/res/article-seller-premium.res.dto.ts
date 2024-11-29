import { ApiProperty } from '@nestjs/swagger';

import { ArticleSellerBaseResDto } from './article-seller-base-res.dto';

export class ArticleSellerPremiumResDto extends ArticleSellerBaseResDto {
  @ApiProperty({
    // example: 123,
    description: 'Number of views',
  })
  numberOfViews: number;

  @ApiProperty({
    // example: 30,
    description: 'Number of daily views',
  })
  dailyViews: number;

  @ApiProperty({
    // example: 200,
    description: 'Number of weekly views',
  })
  weeklyViews: number;

  @ApiProperty({
    // example: 800,
    description: 'Number of monthly views',
  })
  monthlyViews: number;

  @ApiProperty({
    // example: 15000,
    description: 'Average car price in the region',
  })
  avgPriceInRegion: number;

  @ApiProperty({
    // example: 12000,
    description: 'Average car price in the country',
  })
  avgPriceInCountry: number;
}
