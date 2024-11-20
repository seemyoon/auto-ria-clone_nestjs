import { ListArticleQueryDto } from '../req/list-article.query.dto';
import { ArticleBaseSuccessResDto } from './article-base-success.res.dto';

export class ArticleListResDto extends ListArticleQueryDto {
  data: ArticleBaseSuccessResDto[];
  total: number;
}
