import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarID } from '../../../common/types/entity-ids.type';
import { CarEntity } from '../../../database/entities/car.entity';
import { UpdateArticleReqDto } from '../../articles/dto/req/update-article.req.dto';
import { ListCarsQueryDto } from '../../cars/dto/req/list-cars.query.dto';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async findAll(
    query: ListCarsQueryDto,
  ): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');

    if (query.search) {
      qb.andWhere('car.brand ILIKE :search OR car.model ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByCarId(carId: CarID): Promise<CarEntity> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.articles', 'articles');

    qb.where('car.id = :carId', { carId });
    return await qb.getOne();
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
