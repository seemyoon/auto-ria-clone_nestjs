import { ListArticlesQueryDto } from '../req/list-articles-query.dto';
import { ArticleSellerBaseResDto } from './article-seller-base-res.dto';

export class ArticleListResDto extends ListArticlesQueryDto {
  data: ArticleSellerBaseResDto[];
  total: number;
}
