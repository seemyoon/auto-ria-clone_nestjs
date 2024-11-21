import { UserResDto } from '../../../users/models/res/user.res.dto';
import { ArticleBaseSuccessResDto } from './article-base-success.res.dto';

export class ArticleSellerSuccessResDto extends ArticleBaseSuccessResDto {
  seller?: UserResDto;
}
