import { BadRequestException, Injectable } from '@nestjs/common';

import {
  ReportAfter3ChangesID,
  ReportCarID,
  ReportRegionID,
  UserID,
} from '../../../common/types/entity-ids.type';
import { ReportEntity } from '../../../database/entities/report.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarReqDto } from '../../cars/dto/req/car.req.dto';
import { RegionReqDto } from '../../region/dto/req/region.req.dto';
import { CarRepository } from '../../repository/service/car.repository';
import { RegionRepository } from '../../repository/service/region.repository';
import { ReportRepository } from '../../repository/service/report.repository';
import { ReportAfter3ChangesRepository } from '../../repository/service/report-after-3-changes.repository';
import { ReportCarRepository } from '../../repository/service/report-car.repository';
import { ReportRegionRepository } from '../../repository/service/report-region.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UserEnum } from '../../users/enum/users.enum';
import { ListReportsQueryDto } from '../dto/req/list-reports.query.dto';
import { CarReportsResDto } from '../dto/res/car-reports.res.dto';
import { ChangesAfter3TimesReportsResDto } from '../dto/res/changes-after-3-times-reports.res.dto';
import { RegionReportsResDto } from '../dto/res/region-reports.res.dto';
import { ReportEnum } from '../enum/report.enum';
import { ReportMapper } from '../mapper/report.mapper';

@Injectable()
export class ReportsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reportRepository: ReportRepository,
    private readonly carRepository: CarRepository,
    private readonly regionRepository: RegionRepository,
    private readonly reportCarRepository: ReportCarRepository,
    private readonly reportAfter3ChangesRepository: ReportAfter3ChangesRepository,
    private readonly reportRegionRepository: ReportRegionRepository,
  ) {}

  public async getReports(
    userData: IUserData,
    query: ListReportsQueryDto,
  ): Promise<[ReportEntity[], number]> {
    await this.isAdminOrManager(userData.userId);
    return await this.reportRepository.findAll(query);
  }

  public async addCarReport(
    userData: IUserData,
    dto: CarReqDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (![UserEnum.SELLER, UserEnum.DEALERSHIP_SELLER].includes(user.role)) {
      throw new BadRequestException('Only sellers can add car reports');
    }

    const carIsExist = await this.carRepository.findOneBy({
      model: dto.model,
      brand: dto.brand,
    });
    if (carIsExist) {
      throw new BadRequestException('Car already exists');
    }

    if (!dto.brand && !dto.model) {
      throw new BadRequestException('Brand or model is required');
    }

    const report = this.reportRepository.create({
      user_id: user.id,
      type: ReportEnum.APPROVE_ADD_BRAND_OR_MODEL_AUTO,
    });
    await this.reportRepository.save(report);

    const carReport = this.reportCarRepository.create({
      report,
      brand: dto.brand,
      model: dto.model,
    });
    await this.reportCarRepository.save(carReport);
  }

  public async addRegionReport(
    userData: IUserData,
    dto: RegionReqDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (![UserEnum.SELLER, UserEnum.DEALERSHIP_SELLER].includes(user.role)) {
      throw new BadRequestException('Only sellers can add region reports');
    }

    if (!dto.region) {
      throw new BadRequestException('Region is required');
    }

    const regionIsExist = await this.regionRepository.findOneBy({
      place: dto.region,
    });
    if (regionIsExist) {
      throw new BadRequestException('Region already exists');
    }

    const report = this.reportRepository.create({
      user_id: user.id,
      type: ReportEnum.APPROVE_ADD_REGION,
    });
    await this.reportRepository.save(report);

    const regionReport = this.reportRegionRepository.create({
      report,
      region: dto.region,
    });
    await this.reportRegionRepository.save(regionReport);
  }

  public async getReportAfter3Changes(
    userData: IUserData,
    reportAfter3ChangesId: ReportAfter3ChangesID,
  ): Promise<ChangesAfter3TimesReportsResDto> {
    await this.isAdminOrManager(userData.userId);

    const reportAfter3Changes =
      await this.reportAfter3ChangesRepository.findReportAfter3ChangesById(
        reportAfter3ChangesId,
      );

    if (!reportAfter3Changes) {
      throw new BadRequestException('Report not found');
    }

    return ReportMapper.toChangesAfter3TimesResDto(reportAfter3Changes);
  }

  public async getReportRegion(
    userData: IUserData,
    reportRegionId: ReportRegionID,
  ): Promise<RegionReportsResDto> {
    await this.isAdminOrManager(userData.userId);
    const regionReport =
      await this.reportRegionRepository.findReportRegionById(reportRegionId);

    if (!regionReport) {
      throw new BadRequestException('Report not found');
    }

    return ReportMapper.toReportRegionResDto(regionReport);
  }

  public async getReportCar(
    userData: IUserData,
    reportCarId: ReportCarID,
  ): Promise<CarReportsResDto> {
    await this.isAdminOrManager(userData.userId);
    const carReport =
      await this.reportCarRepository.findReportCarById(reportCarId);

    if (!carReport) {
      throw new BadRequestException('Report not found');
    }
    return ReportMapper.toReportCarResDto(carReport);
  }

  public async deleteReportAfter3Changes(
    userData: IUserData,
    reportAfter3ChangesId: ReportAfter3ChangesID,
  ): Promise<void> {
    await this.isAdminOrManager(userData.userId);
    const report = await this.reportAfter3ChangesRepository.findOneBy({
      id: reportAfter3ChangesId,
    });

    if (!report) {
      throw new BadRequestException('Report not found');
    }
    await this.reportAfter3ChangesRepository.remove(report);
  }

  public async deleteReportRegion(
    userData: IUserData,
    reportRegionId: ReportRegionID,
  ): Promise<void> {
    await this.isAdminOrManager(userData.userId);
    const report = await this.reportRegionRepository.findOneBy({
      id: reportRegionId,
    });

    if (!report) {
      throw new BadRequestException('Report not found');
    }
    await this.reportRegionRepository.remove(report);
  }

  public async deleteReportCar(
    userData: IUserData,
    reportCarId: ReportCarID,
  ): Promise<void> {
    await this.isAdminOrManager(userData.userId);
    const report = await this.reportCarRepository.findOneBy({
      id: reportCarId,
    });

    if (!report) {
      throw new BadRequestException('Report not found');
    }
    await this.reportCarRepository.remove(report);
  }

  private async isAdminOrManager(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (![UserEnum.ADMIN, UserEnum.MANAGER].includes(user.role)) {
      throw new BadRequestException('you do not have access rights');
    }
  }
}
