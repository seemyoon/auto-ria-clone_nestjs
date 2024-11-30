import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReportEntity } from '../../../database/entities/report.entity';
import { ListReportsQueryDto } from '../../reports/dto/req/list-reports.query.dto';

@Injectable()
export class ReportRepository extends Repository<ReportEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReportEntity, dataSource.manager);
  }

  public async findAll(
    query: ListReportsQueryDto,
  ): Promise<[ReportEntity[], number]> {
    const qb = this.createQueryBuilder('report');
    qb.leftJoinAndSelect('report.carReport', 'carReport');
    qb.leftJoinAndSelect(
      'report.changesAfter3TimesReport',
      'changesAfter3TimesReport',
    );
    qb.leftJoinAndSelect('report.regionReport', 'regionReport');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
