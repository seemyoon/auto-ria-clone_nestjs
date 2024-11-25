import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async getNumberOfViews(articleId: ArticleID): Promise<number> {
    const result = await this.createQueryBuilder('article')
      .select('SUM(views)', 'numberOfViews')
      .where('article.id = :articleId', { articleId })
      .getRawOne();
    return result?.numberOfViews || 0;
  }

  public async getDailyViews(articleId: ArticleID): Promise<number> {
    const result = await this.createQueryBuilder('article')
      .select('SUM(views)', 'dailyViews')
      .where('article.id = :articleId', { articleId })
      .andWhere('DATE(article.viewedAt) = CURDATE()')
      .getRawOne();
    return result?.dailyViews || 0;
  }

  public async getWeeklyViews(articleId: ArticleID): Promise<number> {
    const result = await this.createQueryBuilder('article')
      .select('SUM(views)', 'weeklyViews')
      .where('article.id = :articleId', { articleId })
      .andWhere('YEARWEEK(article.viewedAt, 1) = YEARWEEK(CURDATE(), 1)')
      .getRawOne();
    return result?.weeklyViews || 0;
  }

  public async getMonthlyViews(articleId: ArticleID): Promise<number> {
    const result = await this.createQueryBuilder('article')
      .select('SUM(views)', 'monthlyViews')
      .where('article.id = :articleId', { articleId })
      .andWhere('MONTH(article.viewedAt) = MONTH(CURDATE())')
      .andWhere('YEAR(article.viewedAt) = YEAR(CURDATE())')
      .getRawOne();
    return result?.monthlyViews || 0;
  }

  public async getAvgPriceInRegion(regionId: ArticleID): Promise<number> {
    const result = await this.createQueryBuilder('article')
      .select('AVG(cost)', 'avgPriceInRegion')
      .where('article.regionId = :regionId', { regionId })
      .getRawOne();
    return result?.avgPriceInRegion || 0;
  }

  public async getAvgPriceInCountry(): Promise<number> {
    const result = await this.createQueryBuilder('article')
      .select('AVG(cost)', 'avgPriceInCountry')
      .getRawOne();
    return result?.avgPriceInCountry || 0;
  }
}
