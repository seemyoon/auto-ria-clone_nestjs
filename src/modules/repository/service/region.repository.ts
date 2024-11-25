import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RegionID } from '../../../common/types/entity-ids.type';
import { RegionEntity } from '../../../database/entities/region.entity';
import { ListRegionsQueryDto } from '../../region/dto/req/list-regions.query.dto';

@Injectable()
export class RegionRepository extends Repository<RegionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RegionEntity, dataSource.manager);
  }

  public async findAll(
    query: ListRegionsQueryDto,
  ): Promise<[RegionEntity[], number]> {
    const qb = this.createQueryBuilder('region');
    if (query.search) {
      qb.andWhere('region.place ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findByRegionId(regionId: RegionID): Promise<RegionEntity> {
    const qb = this.createQueryBuilder('region');
    qb.leftJoinAndSelect('region.articles', 'articles');

    qb.where('region.id = :regionId', { regionId });
    return await qb.getOne();
  }
}
