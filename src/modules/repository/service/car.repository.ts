import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { UpdateArticleReqDto } from '../../articles/dto/req/update-article.req.dto';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async updateCar(dto: UpdateArticleReqDto): Promise<CarEntity> {
    const qb = this.createQueryBuilder('car');

    if (dto?.brand) {
      qb.andWhere('car.brand = :brand', { brand: dto.brand });
    }

    if (dto?.model) {
      qb.andWhere('car.model = :model', { model: dto.model });
    }

    return await qb.getOne();
  }
}
