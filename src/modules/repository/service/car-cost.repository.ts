import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarRegionsEntity } from '../../../database/entities/car-regions.entity';

@Injectable()
export class CarCostRepository extends Repository<CarRegionsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarRegionsEntity, dataSource.manager);
  }
}
