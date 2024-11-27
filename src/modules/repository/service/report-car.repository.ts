import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReportCarEntity } from '../../../database/entities/report-car.entity';

@Injectable()
export class ReportCarRepository extends Repository<ReportCarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReportCarEntity, dataSource.manager);
  }
}
