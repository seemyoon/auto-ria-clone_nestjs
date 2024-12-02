import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReportAfter3ChangesID } from '../../../common/types/entity-ids.type';
import { ReportAfter3ChangesEntity } from '../../../database/entities/report-after-3-changes.entity';

@Injectable()
export class ReportAfter3ChangesRepository extends Repository<ReportAfter3ChangesEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReportAfter3ChangesEntity, dataSource.manager);
  }

  public async findReportAfter3ChangesById(
    reportAfter3ChangesId: ReportAfter3ChangesID,
  ): Promise<ReportAfter3ChangesEntity> {
    const qb = this.createQueryBuilder('reportAfter3Changes')
      .leftJoinAndSelect('reportAfter3Changes.article', 'article')
      .where('reportAfter3Changes.id = :reportAfter3ChangesId', {
        reportAfter3ChangesId,
      });
    return await qb.getOne();
  }
}
