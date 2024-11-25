import { Injectable } from '@nestjs/common';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { BaseArticleReqDto } from '../dto/req/article.req.dto';

@Injectable()
export class ArticlesCarDealerShipService {
  public async getArticles(): Promise<void> {}

  public async getArticle(articleId: ArticleID): Promise<ArticleEntity> {
    return {} as ArticleEntity;
  }

  public async createArticle(
    userData: IUserData,
    dto: BaseArticleReqDto,
  ): Promise<ArticleEntity> {
    return {} as ArticleEntity;
  }

  public async deleteArticle(): Promise<void> {}

  public async editArticle(): Promise<void> {}

  private async verifyArticle(): Promise<void> {}
}
