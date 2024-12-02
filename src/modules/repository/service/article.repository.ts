import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { ListArticlesQueryDto } from '../../articles/dto/req/list-articles-query.dto';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async findAll(
    query: ListArticlesQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('article.car', 'car');
    qb.leftJoinAndSelect('article.region', 'region');

    if (query.search) {
      qb.andWhere(
        new Brackets((qb1) => {
          qb1
            .where('CONCAT(article.title, article.description) ILIKE :search')
            .orWhere('car.brand ILIKE :search')
            .orWhere('car.model ILIKE :search');
        }),
      );
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async updateArticleById(
    articleId: ArticleID,
    updateFields: Partial<ArticleEntity>,
  ): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    await qb
      .update(ArticleEntity)
      .set(updateFields)
      .where('id = :articleId', { articleId })
      .execute();
    return await qb.getOne();
  }

  public async findByArticleId(articleId: ArticleID): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('article.car', 'car');
    qb.leftJoinAndSelect('article.region', 'region');

    qb.where('article.id = :articleId', { articleId });
    return await qb.getOne();
  }

  public async getNumberOfViews(articleId: ArticleID): Promise<number> {
    const qb = await this.createQueryBuilder('article')
      .select('SUM(views)', 'numberOfViews')
      .where('article.id = :articleId', { articleId })
      .getRawOne();
    return qb?.numberOfViews || 0;
  }

  public async getDailyViews(articleId: ArticleID): Promise<number> {
    const qb = await this.createQueryBuilder('article')
      .select('SUM(views)', 'dailyViews')
      .where('article.id = :articleId', { articleId })
      .andWhere('DATE(article.createdAt) = CURRENT_DATE')
      .getRawOne();
    return qb?.dailyViews || 0;
  }

  public async getWeeklyViews(articleId: ArticleID): Promise<number> {
    const qb = await this.createQueryBuilder('article')
      .select('SUM(views)', 'weeklyViews')
      .where('article.id = :articleId', { articleId })
      .andWhere(
        'EXTRACT(week FROM article.createdAt) = EXTRACT(week FROM CURRENT_DATE)',
      )
      .andWhere(
        'EXTRACT(year FROM article.createdAt) = EXTRACT(year FROM CURRENT_DATE)',
      )
      .getRawOne();
    return qb?.weeklyViews || 0;
  }

  public async getMonthlyViews(articleId: ArticleID): Promise<number> {
    const qb = await this.createQueryBuilder('article')
      .select('SUM(views)', 'monthlyViews')
      .where('article.id = :articleId', { articleId })
      .andWhere(
        'EXTRACT(MONTH FROM article.createdAt) = EXTRACT(MONTH FROM CURRENT_DATE)',
      )
      .andWhere(
        'EXTRACT(YEAR FROM article.createdAt) = EXTRACT(YEAR FROM CURRENT_DATE)',
      )
      .getRawOne();
    return qb?.monthlyViews || 0;
  }

  public async getAvgPriceInRegion(articleId: ArticleID): Promise<number> {
    const article = await this.findOne({
      where: { id: articleId },
      relations: ['region'],
    });

    if (!article || !article.region) {
      throw new BadRequestException('Article or its region not found');
    }

    const regionId = article.region.id;

    const qb = await this.createQueryBuilder('article')
      .select('ROUND(AVG(article.cost), 2)', 'avgPriceInRegion')
      .where('article.region_id = :regionId', { regionId })
      .getRawOne();

    return qb?.avgPriceInRegion || 0;
  }

  public async getAvgPriceInCountry(): Promise<number> {
    const qb = await this.createQueryBuilder('article')
      .select('ROUND(AVG(cost), 2)', 'avgPriceInCountry')
      .getRawOne();
    return qb?.avgPriceInCountry || 0;
  }
}
