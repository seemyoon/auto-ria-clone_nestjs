import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SubscribeEntity } from '../../../db/entities/subscribe.entity';

@Injectable()
export class SubscribeRepository extends Repository<SubscribeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SubscribeEntity, dataSource.manager);
  }
}
