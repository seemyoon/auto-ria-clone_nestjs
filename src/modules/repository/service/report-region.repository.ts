import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReportRegionEntity } from '../../../database/entities/report-region.entity';

@Injectable()
export class ReportRegionRepository extends Repository<ReportRegionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReportRegionEntity, dataSource.manager);
  }
}
