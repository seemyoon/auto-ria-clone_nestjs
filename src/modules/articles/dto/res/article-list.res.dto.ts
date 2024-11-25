import { ListArticlesQueryDto } from '../req/list-articles-query.dto';
import { ArticleBaseResDto } from './article-base.res.dto';

export class ArticleListResDto extends ListArticlesQueryDto {
  data: ArticleBaseResDto[];
  total: number;
}
