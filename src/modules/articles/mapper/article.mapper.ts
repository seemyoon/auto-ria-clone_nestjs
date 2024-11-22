import { Injectable } from '@nestjs/common';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { CarMapper } from '../../cars/mapper/car.mapper';
import { UserMapper } from '../../users/mapper/user.mapper';
import { ListArticleQueryDto } from '../dto/req/list-article.query.dto';
import { ArticleListResDto } from '../dto/res/article-list.res.dto';
import { ArticleSellerResDto } from '../dto/res/article-seller.res.dto';

@Injectable()
export class ArticleMapper {
  public static toResDto(data: ArticleEntity): ArticleSellerResDto {
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
      // profanityCheck
      // numberOfViews
    };
  }

  public static toResDtoList(
    data: ArticleEntity[],
    total: number,
    query: ListArticleQueryDto,
  ): ArticleListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
