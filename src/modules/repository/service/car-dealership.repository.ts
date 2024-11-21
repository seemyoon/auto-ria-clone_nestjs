import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarDealerShipEntity } from '../../../database/entities/car-dealer-ship.entity';

@Injectable()
export class CarDealerShipRepository extends Repository<CarDealerShipEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarDealerShipEntity, dataSource.manager);
  }
}
