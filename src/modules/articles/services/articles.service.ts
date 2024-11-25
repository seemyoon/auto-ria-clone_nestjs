import { BadRequestException, Injectable } from '@nestjs/common';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/service/article.repository';
import { CarRepository } from '../../repository/service/car.repository';
import { RegionRepository } from '../../repository/service/region.repository';
import { BaseArticleReqDto } from '../dto/req/article.req.dto';
import { ArticleSellerPremiumResDto } from '../dto/res/article-seller-premium.res.dto';
import { ArticleMapper } from '../mapper/article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly regionRepository: RegionRepository,
    private readonly carRepository: CarRepository,
  ) {}

  public async getArticles(articleId: ArticleID): Promise<void> {}

  public async getArticle(articleId: ArticleID): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({ where: { id: articleId } });
  }

  public async createArticle(
    userData: IUserData,
    dto: BaseArticleReqDto,
  ): Promise<ArticleEntity> {
    return {} as ArticleEntity;
  }

  public async getPremiumInfoArticle(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleSellerPremiumResDto> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
    });
    if (!article) {
      throw new Error('Article not found');
    }

    const premiumSeller = await this.articleRepository.findOne({
      where: { user_id: userData.userId },
    });

    if (!premiumSeller.sellerType.includes('PREMIUM')) {
      throw new BadRequestException('Invalid role');
    }

    const numberOfViews =
      await this.articleRepository.getNumberOfViews(articleId);
    const dailyViews = await this.articleRepository.getDailyViews(articleId);
    const weeklyViews = await this.articleRepository.getWeeklyViews(articleId);
    const monthlyViews =
      await this.articleRepository.getMonthlyViews(articleId);
    const avgPriceInRegion =
      await this.articleRepository.getAvgPriceInRegion(articleId);
    const avgPriceInCountry =
      await this.articleRepository.getAvgPriceInCountry();

    return ArticleMapper.toPremiumResDto(
      article,
      numberOfViews,
      dailyViews,
      weeklyViews,
      monthlyViews,
      avgPriceInRegion,
      avgPriceInCountry,
    );
  }

  public async deleteArticle(): Promise<void> {}

  public async editArticle(): Promise<ArticleEntity> {
    return {} as ArticleEntity;
  }

  private async verifyArticle(): Promise<void> {}
}

// export class Approve3TimesOfCarResDto {
//   @ApiProperty({
//     example:
//       'You have edited the ad 3 times. It is now being reviewed. Please wait for confirmation.',
//     description: 'Message indicating attempts',
//   })
//   message: string;
// }
//
// export class ApproveBrandOfCarResDto {
//   @ApiProperty({
//     example:
//       'Sorry, but no car was found for your request. The request has been sent to the manager, please wait' +
//       ' until he approves it.',
//     description: 'Message indicating the status of the request',
//   })
//   message: string;
// }
//
// export class ApproveRegionOfCarResDto {
//   @ApiProperty({
//     example:
//       'Sorry, no car was found in the specified region. The request has been sent to the manager for approval.' +
//       ' Please  wait for confirmation.',
//     description:
//       'Message indicating the status of the request related to car region approval',
//   })
//   message: string;
// }
