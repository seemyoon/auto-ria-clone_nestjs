import { ListArticleQueryDto } from '../req/list-article.query.dto';
import { ArticleSuccessResDto } from './article-success.res.dto';

export class ArticleListResDto extends ListArticleQueryDto {
  data: ArticleSuccessResDto[];
  total: number;
}
