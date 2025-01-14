import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import {
  ReportAfter3ChangesID,
  ReportCarID,
  ReportRegionID,
} from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarReqDto } from '../../cars/dto/req/car.req.dto';
import { RegionReqDto } from '../../region/dto/req/region.req.dto';
import { ListReportsQueryDto } from '../dto/req/list-reports.query.dto';
import { CarReportsResDto } from '../dto/res/car-reports.res.dto';
import { ChangesAfter3TimesReportsResDto } from '../dto/res/changes-after-3-times-reports.res.dto';
import { RegionReportsResDto } from '../dto/res/region-reports.res.dto';
import { ReportsListResDto } from '../dto/res/reports-list.res.dto';
import { ReportMapper } from '../mapper/report.mapper';
import { ReportsService } from '../service/reports.service';

@ApiBearerAuth()
@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  public async getReports(
    @CurrentUser() userData: IUserData,
    @Query() query: ListReportsQueryDto,
  ): Promise<ReportsListResDto> {
    const [entities, total] = await this.reportsService.getReports(
      userData,
      query,
    );
    return ReportMapper.toResDtoList(entities, total, query);
  }

  @Post('add-brand-or-model-auto')
  public async addCarReport(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarReqDto,
  ): Promise<void> {
    await this.reportsService.addCarReport(userData, dto);
  }

  @Post('add-region')
  public async addRegionReport(
    @CurrentUser() userData: IUserData,
    @Body() dto: RegionReqDto,
  ): Promise<void> {
    await this.reportsService.addRegionReport(userData, dto);
  }

  @Get('after-3-changes/:reportAfter3ChangesId')
  public async getReportAfter3ChangesEntity(
    @CurrentUser() userData: IUserData,
    @Param('reportAfter3ChangesId')
    reportAfter3ChangesId: ReportAfter3ChangesID,
  ): Promise<ChangesAfter3TimesReportsResDto> {
    return await this.reportsService.getReportAfter3Changes(
      userData,
      reportAfter3ChangesId,
    );
  }

  @Get('car/:reportCarId')
  public async getReportCarId(
    @CurrentUser() userData: IUserData,
    @Param('reportCarId')
    reportCarId: ReportCarID,
  ): Promise<CarReportsResDto> {
    return await this.reportsService.getReportCar(userData, reportCarId);
  }

  @Get('region/:reportRegionId')
  public async getReportRegion(
    @CurrentUser() userData: IUserData,
    @Param('reportRegionId')
    reportRegionId: ReportRegionID,
  ): Promise<RegionReportsResDto> {
    return await this.reportsService.getReportRegion(userData, reportRegionId);
  }

  @Delete('after-3-changes/:reportAfter3ChangesId')
  public async deleteReportAfter3ChangesEntity(
    @CurrentUser() userData: IUserData,
    @Param('reportAfter3ChangesId')
    reportAfter3ChangesId: ReportAfter3ChangesID,
  ): Promise<void> {
    await this.reportsService.deleteReportAfter3Changes(
      userData,
      reportAfter3ChangesId,
    );
  }

  @Delete('car/:reportCarId')
  public async deleteReportCarId(
    @CurrentUser() userData: IUserData,
    @Param('reportCarId')
    reportCarId: ReportCarID,
  ): Promise<void> {
    await this.reportsService.deleteReportCar(userData, reportCarId);
  }

  @ApiBearerAuth()
  @Delete('region/:reportRegionId')
  public async deleteReportRegion(
    @CurrentUser() userData: IUserData,
    @Param('reportRegionId')
    reportRegionId: ReportRegionID,
  ): Promise<void> {
    await this.reportsService.deleteReportRegion(userData, reportRegionId);
  }

  // @Post('approve/:id')
  // public async approveReport(
  //   @CurrentUser() userData: IUserData,
  //   @Param('id') reportId: ReportID,
  // ): Promise<void> {
  //   await this.reportsService.approveReport(userData, reportId);
  // }
}
