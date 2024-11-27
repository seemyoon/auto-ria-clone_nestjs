import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ReportID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarReqDto } from '../../cars/dto/req/car.req.dto';
import { RegionReqDto } from '../../region/dto/req/region.req.dto';
import { ReportsService } from '../service/reports.service';

@ApiBearerAuth()
@ApiTags('Reports')
@Controller('cars')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  public async getReports(@CurrentUser() userData: IUserData): Promise<void> {
    await this.reportsService.getReports(userData);
  }

  @Post('add-brand-or-model-auto')
  public async addCarReport(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarReqDto,
  ): Promise<void> {
    return await this.reportsService.addCarReport(userData, dto);
  }

  @Post('add-region-auto')
  public async addRegionReport(
    @CurrentUser() userData: IUserData,
    @Body() dto: RegionReqDto,
  ): Promise<void> {
    return await this.reportsService.addRegionReport(userData, dto);
  }

  @Post('approve/:id')
  public async approveReport(
    @CurrentUser() userData: IUserData,
    @Param('id') reportId: ReportID,
  ): Promise<void> {
    await this.reportsService.approveReport(userData, reportId);
  }

  // @Post('approveAll')
  // public async approveReport(
  //   @CurrentUser() userData: IUserData,
  // ): Promise<void> {
  //   await this.reportsService.approveReport();
  // }
}
