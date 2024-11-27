import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReportAfter3ChangesEntity } from '../../../database/entities/report-after-3-changes.entity';

@Injectable()
export class ReportAfter3ChangesRepository extends Repository<ReportAfter3ChangesEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReportAfter3ChangesEntity, dataSource.manager);
  }
}
