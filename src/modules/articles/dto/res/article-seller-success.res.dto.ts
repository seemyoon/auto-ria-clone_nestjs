import { SellerResDto } from '../../../users/models/res/seller.res.dto';
import { ArticleBaseSuccessResDto } from './article-base-success.res.dto';

export class ArticleSellerSuccessResDto extends ArticleBaseSuccessResDto {
  seller?: SellerResDto;
}
