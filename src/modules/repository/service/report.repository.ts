import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReportID } from '../../../common/types/entity-ids.type';
import { ReportEntity } from '../../../database/entities/report.entity';
import { ReportAfter3ChangesEntity } from '../../../database/entities/report-after-3-changes.entity';
import { ReportCarEntity } from '../../../database/entities/report-car.entity';
import { ReportRegionEntity } from '../../../database/entities/report-region.entity';
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

  public async getReportCar(reportId: ReportID): Promise<ReportCarEntity> {
    const report = await this.createQueryBuilder('report')
      .leftJoinAndSelect('report.carReport', 'carReport')
      .where('report.id = :reportId', { reportId })
      .getOne();

    if (!report || !report.carReport) {
      throw new BadRequestException('Car report not found');
    }

    return report.carReport;
  }

  public async getReportRegion(
    reportId: ReportID,
  ): Promise<ReportRegionEntity> {
    const report = await this.createQueryBuilder('report')
      .leftJoinAndSelect('report.regionReport', 'regionReport')
      .where('report.id = :reportId', { reportId })
      .getOne();

    if (!report || !report.regionReport) {
      throw new BadRequestException('Region report not found');
    }

    return report.regionReport;
  }

  public async getReportAfter3Changes(
    reportId: ReportID,
  ): Promise<ReportAfter3ChangesEntity> {
    const report = await this.createQueryBuilder('report')
      .leftJoinAndSelect(
        'report.changesAfter3TimesReport',
        'changesAfter3TimesReport',
      )
      .where('report.id = :reportId', { reportId })
      .getOne();

    if (!report || !report.changesAfter3TimesReport) {
      throw new BadRequestException('Report after 3 changes not found');
    }

    return report.changesAfter3TimesReport;
  }
}
