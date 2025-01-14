import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { PriceHelper } from '../../../common/helpers/price.helper';
import { ArticleID, UserID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { ReportEntity } from '../../../database/entities/report.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { isActiveArticleEnum } from '../../../database/enums/is-active-article.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CurrencyService } from '../../price/services/currency.service';
import { ReportEnum } from '../../reports/enum/report.enum';
import { ArticleRepository } from '../../repository/service/article.repository';
import { CarRepository } from '../../repository/service/car.repository';
import { RegionRepository } from '../../repository/service/region.repository';
import { ReportRepository } from '../../repository/service/report.repository';
import { ReportAfter3ChangesRepository } from '../../repository/service/report-after-3-changes.repository';
import { SubscribeRepository } from '../../repository/service/subscribe.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { SellerEnum } from '../../users/enum/seller.enum';
import { UserEnum } from '../../users/enum/users.enum';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';
import { BaseArticleReqDto } from '../dto/req/article.req.dto';
import { UpdateArticleReqDto } from '../dto/req/update-article.req.dto';
import { ArticleApproveEditPendingResDto } from '../dto/res/article-approve.res.dto';
import { ArticleSellerPremiumResDto } from '../dto/res/article-seller-premium.res.dto';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticleValidator } from '../validator/article.validator';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly regionRepository: RegionRepository,
    private readonly carRepository: CarRepository,
    private readonly currencyService: CurrencyService,
    private readonly userRepository: UserRepository,
    private readonly subscribeRepository: SubscribeRepository,
    private readonly reportAfter3ChangesRepository: ReportAfter3ChangesRepository,
    private readonly reportRepository: ReportRepository,
  ) {}

  public async getArticles(
    query: ListUsersQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    return await this.articleRepository.findAll(query);
  }

  public async getArticle(articleId: ArticleID): Promise<ArticleEntity> {
    const article = await this.articleRepository.findByArticleId(articleId);
    if (!article) {
      throw new ConflictException('Article not found');
    }

    article.views += 1;
    await this.articleRepository.save(article);

    return await this.articleRepository.findByArticleId(articleId);
  }

  public async createArticle(
    userData: IUserData,
    dto: BaseArticleReqDto,
  ): Promise<ArticleEntity> {
    const user = await this.userRepository.findById(userData.userId);
    const subscribe = await this.subscribeRepository.findOneBy({
      user_id: userData.userId,
    });

    if (!subscribe) {
      if (user.articles && user.articles.length >= 1) {
        throw new ConflictException(
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
        sellerType = null;
        break;
      default:
        throw new BadRequestException('Invalid user role');
    }

    const region = await this.regionRepository.findOneBy({ place: dto.place });
    if (!region) {
      throw new BadRequestException('Region not found');
    }

    const car = await this.carRepository.findOneBy({
      brand: dto.brand,
      model: dto.model,
    });
    if (!car) {
      throw new BadRequestException(
        'Your car is not on the list? Please send your request to the manager for approval (refer to another endpoint)',
      );
    }

    const { currencyRate, costUAH } = await PriceHelper.getConvertedPrice(
      this.currencyService,
      dto.currency,
      dto.cost,
    );
    const result = this.articleRepository.create({
      title: dto.title,
      description: dto.description,
      body: dto.body,
      cost: dto.cost,
      currencyRate: currencyRate,
      costUAH: costUAH,
      sellerType: sellerType,
      user,
      car,
      region,
    });

    const savedArticle = await this.articleRepository.save(result);

    await ArticleValidator.validateProfanity(
      `${dto.title} ${dto.description} ${dto.body}`,
      savedArticle,
      this.articleRepository,
    );

    return savedArticle;
  }

  public async getPremiumInfoArticle(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleSellerPremiumResDto> {
    const article = await this.articleRepository.findByArticleId(articleId);
    if (!article) {
      throw new ConflictException('Article not found');
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

  public async deleteArticle(
    articleId: ArticleID,
    userData: IUserData,
  ): Promise<void> {
    const articleToDelete = await this.returnArticleOrThrow(articleId);

    const user = await this.returnUserOrThrow(userData.userId);

    const allowedRoles = [
      UserEnum.ADMIN,
      UserEnum.MANAGER,
      UserEnum.DEALERSHIP_ADMIN,
      UserEnum.DEALERSHIP_MANAGER,
    ];

    if (
      articleToDelete.user_id !== userData.userId &&
      !allowedRoles.includes(user.role)
    ) {
      throw new ConflictException(
        'You do not have permission to edit this article.',
      );
    }
    await this.articleRepository.remove(articleToDelete);
  }

  public async editArticle(
    userData: IUserData,
    articleId: ArticleID,
    dto: UpdateArticleReqDto,
  ): Promise<ArticleEntity | ArticleApproveEditPendingResDto> {
    const article = await this.returnArticleOrThrow(articleId);

    const user = await this.returnUserOrThrow(userData.userId);

    const allowedRoles = [
      UserEnum.ADMIN,
      UserEnum.MANAGER,
      UserEnum.DEALERSHIP_ADMIN,
      UserEnum.DEALERSHIP_MANAGER,
    ];

    if (
      article.user_id !== userData.userId &&
      !allowedRoles.includes(user.role)
    ) {
      throw new ConflictException(
        'You do not have permission to edit this article.',
      );
    }

    if (article.changesCount >= 3 && !allowedRoles.includes(user.role)) {
      throw new ConflictException(
        'This article requires manager or admin approval for further changes.',
      );
    }

    const region = await this.regionRepository.findOneBy({ place: dto.place });
    if (!region) {
      throw new BadRequestException('Region not found');
    }

    const car = await this.carRepository.findOneBy({
      brand: dto.brand,
      model: dto.model,
    });
    if (!car) {
      throw new BadRequestException(
        'Your car is not on the list? Please send your request to the manager for approval (refer to another endpoint)',
      );
    }
    const currencyRate = await this.currencyService.getCurrency(dto.currency);
    const costUAH = await PriceHelper.convertInUAH(
      dto.currency,
      dto.cost,
      this.currencyService,
    );

    article.title = dto.title;
    article.description = dto.description;
    article.body = dto.body;
    article.cost = dto.cost;
    article.currencyRate = currencyRate;
    article.costUAH = costUAH;
    article.user = user;
    article.car = car;
    article.region = region;

    article.changesCount += 1;

    if (article.changesCount >= 3) {
      const report = new ReportEntity();
      report.type = ReportEnum.APPROVE_CHANGE_AD_AUTO_MORE_THAN_3_TIMES;
      report.user_id = user.id;

      await this.reportRepository.save(report);

      const reportAfter3Changes = this.reportAfter3ChangesRepository.create({
        article_id: articleId,
        report: report,
      });

      await this.reportAfter3ChangesRepository.save(reportAfter3Changes);

      article.status = isActiveArticleEnum.INACTIVE;
      await this.articleRepository.save(article);

      return {
        message:
          'This article requires manager or admin approval for further changes.',
      };
    }
    await ArticleValidator.validateProfanity(
      `${dto.title} ${dto.description} ${dto.body}`,
      article,
      this.articleRepository,
    );
    await this.articleRepository.save(article);

    return article;
  }

  public async activeOrInactiveArticle(
    articleId: ArticleID,
    isActive: isActiveArticleEnum,
    userData: IUserData,
  ): Promise<void> {
    await this.isAdminOrManager(userData.userId);

    const article = await this.articleRepository.findByArticleId(articleId);
    if (!article) {
      throw new ConflictException('Article not found');
    }

    article.status = isActive;
    await this.articleRepository.save(article);
  }

  private async returnUserOrThrow(userId: UserID): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
    return user;
  }

  private async isAdminOrManager(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (![UserEnum.ADMIN, UserEnum.MANAGER].includes(user.role)) {
      throw new BadRequestException('you do not have access rights');
    }
  }

  private async returnArticleOrThrow(
    articleId: ArticleID,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findByArticleId(articleId);
    if (!article) {
      throw new ConflictException('Article not found');
    }
    return article;
  }

  private async isSubscribed(userId: UserID): Promise<void> {
    try {
      await this.subscribeRepository.findOneBy({
        user_id: userId,
      });
    } catch (error) {
      throw new ConflictException('Subscription not found');
    }
  }
}
