import { ApiProperty } from '@nestjs/swagger';

import { ArticleBaseSuccessResDto } from './article-base-success.res.dto';

export class ArticleCarDealershipSellerSuccessResDto extends ArticleBaseSuccessResDto {
  @ApiProperty({ required: false })
  dealershipName?: string; // Если машина от автосалона, то здесь будет название автосалона

  @ApiProperty({ required: false })
  dealershipAddress?: string; //
}
