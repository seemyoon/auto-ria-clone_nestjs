import { Injectable } from '@nestjs/common';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { CarMapper } from '../../cars/mapper/car.mapper';
import { RegionMapper } from '../../region/mapper/region.mapper';
import { UserMapper } from '../../users/mapper/user.mapper';
import { ListArticlesQueryDto } from '../dto/req/list-articles-query.dto';
import { ArticleListResDto } from '../dto/res/article-list.res.dto';
import { ArticleSellerBaseResDto } from '../dto/res/article-seller-base-res.dto';
import { ArticleSellerPremiumResDto } from '../dto/res/article-seller-premium.res.dto';

@Injectable()
export class ArticleMapper {
  public static toBaseResDto(data: ArticleEntity): ArticleSellerBaseResDto {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      body: data.body,
      created: data.created,
      updated: data.updated,
      sellerType: data.sellerType,
      seller: data.user ? UserMapper.toResDto(data.user) : null,
      car: data.car ? CarMapper.toResDto(data.car) : null,
      cost: data.cost,
      region: data.region ? RegionMapper.toResDto(data.region) : null,
      // profanityCheck
    };
  }

  public static toPremiumResDto(
    data: ArticleEntity,
    numberOfViews: number,
    dailyViews: number,
    weeklyViews: number,
    monthlyViews: number,
    avgPriceInRegion: number,
    avgPriceInCountry: number,
  ): ArticleSellerPremiumResDto {
    return {
      ...this.toBaseResDto(data),
      numberOfViews,
      dailyViews,
      weeklyViews,
      monthlyViews,
      avgPriceInRegion,
      avgPriceInCountry,
    };
  }

  public static toResDtoList(
    data: ArticleEntity[],
    total: number,
    query: ListArticlesQueryDto,
  ): ArticleListResDto {
    return { data: data.map(this.toBaseResDto), total, ...query };
  }
}
