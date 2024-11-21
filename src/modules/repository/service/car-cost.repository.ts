import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarCostEntity } from '../../../database/entities/car-cost.entity';

@Injectable()
export class CarCostRepository extends Repository<CarCostEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarCostEntity, dataSource.manager);
  }
}
