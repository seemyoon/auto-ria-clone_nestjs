import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { ArticleID, UserID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/service/article.repository';
import { CarRepository } from '../../repository/service/car.repository';
import { RegionRepository } from '../../repository/service/region.repository';
import { SubscribeRepository } from '../../repository/service/subscribe.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { SellerEnum } from '../../users/enum/seller.enum';
import { UserEnum } from '../../users/enum/users.enum';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';
import { BaseArticleReqDto } from '../dto/req/article.req.dto';
import { ArticleSellerPremiumResDto } from '../dto/res/article-seller-premium.res.dto';
import { ArticleMapper } from '../mapper/article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly regionRepository: RegionRepository,
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
    private readonly subscribeRepository: SubscribeRepository,
  ) {}

  public async getArticles(
    query: ListUsersQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    return await this.articleRepository.findAll(query);
  }

  public async getArticle(articleId: ArticleID): Promise<ArticleEntity> {
    return await this.articleRepository.findByArticleId(articleId);
  }

  public async createArticle(
    userData: IUserData,
    dto: BaseArticleReqDto,
  ): Promise<ArticleEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    const subscribe = await this.subscribeRepository.findOneBy({
      user_id: userData.userId,
    });

    if (!subscribe) {
      if (user.articles.length >= 1) {
        throw new BadRequestException(
          "You have a basic subscription, so you can't create more than 1 article,",
        );
      }
    }

    let sellerType: SellerEnum;
    switch (user.role) {
      case UserEnum.DEALERSHIP_SELLER:
        sellerType = SellerEnum.DEALERSHIP_SELLER;
        break;
      case UserEnum.SELLER:
        sellerType = SellerEnum.SELLER;
        break;
      case UserEnum.MANAGER:
      case UserEnum.DEALERSHIP_MANAGER:
      case UserEnum.ADMIN:
      case UserEnum.DEALERSHIP_ADMIN:
        break;
      default:
        throw new BadRequestException('Invalid user role');
    }

    const region = await this.regionRepository.findOneBy({ place: dto.place });
    if (!region) {
      throw new BadRequestException('Region not found');
    }

    // const car = await this.carRepository.findOneBy({
    //   brand: dto.brand,
    //   model: dto.model,
    // });
    // if (!car) {
    //   throw new BadRequestException(
    //     'Your car is not on the list? Please send your request to the manager for approval',
    //   ); //todo say to another endpoint
    // }

    return await this.articleRepository.save(
      this.articleRepository.create({
        ...dto,
        user_id: userData.userId,
        sellerType,
      }),
    );
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
    await this.isSubscribed(userData.userId);

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

  private async isSubscribed(userId: UserID): Promise<void> {
    await this.subscribeRepository.findOneBy({
      user_id: userId,
    });
    throw new ConflictException('Subscription not found');
  }
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
