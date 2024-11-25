import { Injectable } from '@nestjs/common';

import { CarEntity } from '../../../database/entities/car.entity';
import { ArticleMapper } from '../../articles/mapper/article.mapper';
import { CarResDto } from '../dto/res/car.res.dto';

@Injectable()
export class CarMapper {
  public static toResDto(data: CarEntity): CarResDto {
    return {
      id: data.id,
      brand: data.brand,
      model: data.model,
      cost: data.cost,
      created: data.created,
      updated: data.updated,
      articles: data.articles
        ? data.articles.map((article) => ArticleMapper.toBaseResDto(article))
        : [],
    };
  }
}
