import { Injectable } from '@nestjs/common';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { isActiveArticleEnum } from '../../../database/enums/is-active-article.enum';
import { ArticleRepository } from '../../repository/service/article.repository';
import { CheckProfanityHelper } from '../helpers/bad-words.helper';

@Injectable()
export class ArticleValidator {
  public static async validateProfanity(
    text: string,
    article: ArticleEntity,
    articleRepository: ArticleRepository,
  ): Promise<void> {
    const containsProfanity = await CheckProfanityHelper.checkProfanity(text);

    if (containsProfanity) {
      article.status = isActiveArticleEnum.INACTIVE;
      await articleRepository.save(article);
    } else {
      article.status = isActiveArticleEnum.ACTIVE;
      await articleRepository.save(article);
    }
  }
}
