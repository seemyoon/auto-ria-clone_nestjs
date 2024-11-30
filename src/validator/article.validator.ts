import { Injectable } from '@nestjs/common';

import { ArticleEntity } from '../database/entities/article.entity';
import { isActiveArticleEnum } from '../database/enums/is-active-article.enum';
import { BadWordsHelper } from '../modules/articles/helpers/bad-words.helper';
import { ArticleRepository } from '../modules/repository/service/article.repository';

@Injectable()
export class ArticleValidator {
  public static async validateProfanity(
    text: string,
    article: ArticleEntity,
    articleRepository: ArticleRepository,
  ): Promise<void> {
    const swearWord = await BadWordsHelper.checkProfanity(text);
    if (!swearWord) {
      article.status = isActiveArticleEnum.ACTIVE;
      await articleRepository.save(article);
    }
  }
}
