import { Injectable } from '@nestjs/common';

import { ReportEntity } from '../../../database/entities/report.entity';
import { ReportAfter3ChangesEntity } from '../../../database/entities/report-after-3-changes.entity';
import { ReportCarEntity } from '../../../database/entities/report-car.entity';
import { ReportRegionEntity } from '../../../database/entities/report-region.entity';
import { ListReportsQueryDto } from '../dto/req/list-reports.query.dto';
import { CarReportsResDto } from '../dto/res/car-reports.res.dto';
import { ChangesAfter3TimesReportsResDto } from '../dto/res/changes-after-3-times-reports.res.dto';
import { RegionReportsResDto } from '../dto/res/region-reports.res.dto';
import { ReportResDto } from '../dto/res/report.res.dto';
import { ReportsListResDto } from '../dto/res/reports-list.res.dto';

@Injectable()
export class ReportMapper {
  public static toBaseResDto(data: ReportEntity): ReportResDto {
    return {
      id: data.id,
      createdAt: data.created,
      type: data.type,
    };
  }

  public static toChangesAfter3TimesResDto(
    data: ReportAfter3ChangesEntity,
  ): ChangesAfter3TimesReportsResDto {
    return {
      id: data.id,
      createdAt: data.createdAt,
      articleId: data.article.id,
    };
  }

  public static toReportRegionResDto(
    data: ReportRegionEntity,
  ): RegionReportsResDto {
    return {
      id: data.id,
      place: data.region,
      createdAt: data.createdAt,
    };
  }

  public static toReportCarResDto(data: ReportCarEntity): CarReportsResDto {
    return {
      id: data.id,
      created: data.createdAt,
      brand: data.brand,
      model: data.model,
    };
  }

  public static toResDtoList(
    data: ReportEntity[],
    total: number,
    query: ListReportsQueryDto,
  ): ReportsListResDto {
    return { data: data.map(this.toBaseResDto), total, ...query };
  }
}
