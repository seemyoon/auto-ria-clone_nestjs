import { ListArticleQueryDto } from '../req/list-article.query.dto';
import { ArticleBaseResDto } from './article-base.res.dto';

export class ArticleListResDto extends ListArticleQueryDto {
  data: ArticleBaseResDto[];
  total: number;
}
