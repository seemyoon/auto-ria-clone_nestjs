import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReportCarID } from '../../../common/types/entity-ids.type';
import { ReportCarEntity } from '../../../database/entities/report-car.entity';

@Injectable()
export class ReportCarRepository extends Repository<ReportCarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReportCarEntity, dataSource.manager);
  }

  public async findReportCarById(
    reportCarId: ReportCarID,
  ): Promise<ReportCarEntity> {
    const qb = this.createQueryBuilder('reportCar')
      .leftJoinAndSelect('reportCar.report', 'report')
      .where('reportCar.id = :reportCarId', {
        reportCarId,
      });
    return await qb.getOne();
  }
}
