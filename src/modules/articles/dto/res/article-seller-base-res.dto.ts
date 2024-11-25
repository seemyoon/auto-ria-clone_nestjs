import { UserResDto } from '../../../users/models/res/user.res.dto';
import { ArticleBaseResDto } from './article-base.res.dto';

export class ArticleSellerBaseResDto extends ArticleBaseResDto {
  seller?: UserResDto;
}
