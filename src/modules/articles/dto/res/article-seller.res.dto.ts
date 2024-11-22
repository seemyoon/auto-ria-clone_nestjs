import { UserResDto } from '../../../users/models/res/user.res.dto';
import { ArticleBaseResDto } from './article-base.res.dto';

export class ArticleSellerResDto extends ArticleBaseResDto {
  seller?: UserResDto;
}
