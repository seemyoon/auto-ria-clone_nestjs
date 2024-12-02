import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReportRegionID } from '../../../common/types/entity-ids.type';
import { ReportRegionEntity } from '../../../database/entities/report-region.entity';

@Injectable()
export class ReportRegionRepository extends Repository<ReportRegionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReportRegionEntity, dataSource.manager);
  }

  public async findReportRegionById(
    reportRegionId: ReportRegionID,
  ): Promise<ReportRegionEntity> {
    const qb = this.createQueryBuilder('reportRegion')
      .leftJoinAndSelect('reportRegion.report', 'report')
      .where('reportRegion.id = :reportRegionId', {
        reportRegionId,
      });
    return await qb.getOne();
  }
}
