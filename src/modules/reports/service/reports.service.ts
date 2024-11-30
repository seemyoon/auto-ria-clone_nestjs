import { BadRequestException, Injectable } from '@nestjs/common';

import {
  ReportAfter3ChangesID,
  ReportCarID,
  ReportRegionID,
  UserID,
} from '../../../common/types/entity-ids.type';
import { ReportEntity } from '../../../database/entities/report.entity';
import { ReportAfter3ChangesEntity } from '../../../database/entities/report-after-3-changes.entity';
import { ReportCarEntity } from '../../../database/entities/report-car.entity';
import { ReportRegionEntity } from '../../../database/entities/report-region.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarReqDto } from '../../cars/dto/req/car.req.dto';
import { RegionReqDto } from '../../region/dto/req/region.req.dto';
import { ReportRepository } from '../../repository/service/report.repository';
import { ReportAfter3ChangesRepository } from '../../repository/service/report-after-3-changes.repository';
import { ReportCarRepository } from '../../repository/service/report-car.repository';
import { ReportRegionRepository } from '../../repository/service/report-region.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UserEnum } from '../../users/enum/users.enum';
import { ListReportsQueryDto } from '../dto/req/list-reports.query.dto';
import { ReportEnum } from '../enum/report.enum';

@Injectable()
export class ReportsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reportRepository: ReportRepository,
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
  ): Promise<ReportAfter3ChangesEntity> {
    await this.isAdminOrManager(userData.userId);
    return await this.reportAfter3ChangesRepository.findOneBy({
      id: reportAfter3ChangesId,
    });
  }

  public async getReportRegion(
    userData: IUserData,
    reportRegionId: ReportRegionID,
  ): Promise<ReportRegionEntity> {
    await this.isAdminOrManager(userData.userId);
    return await this.reportRegionRepository.findOneBy({ id: reportRegionId });
  }

  public async getReportCar(
    userData: IUserData,
    reportCarId: ReportCarID,
  ): Promise<ReportCarEntity> {
    await this.isAdminOrManager(userData.userId);
    return await this.reportCarRepository.findOneBy({ id: reportCarId });
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

  // public async approveReport(
  //   userData: IUserData,
  //   reportId: ReportID,
  // ): Promise<void> {
  //   const user = await this.userRepository.findOneBy({ id: userData.userId });
  //   if (![UserEnum.ADMIN, UserEnum.MANAGER].includes(user.role)) {
  //     throw new BadRequestException(
  //       'Only admins and managers can approve reports',
  //     );
  //   }
  //
  //   const report = await this.reportRepository.findOneBy({ id: reportId });
  //   if (!report) {
  //     throw new BadRequestException('Report not found');
  //   }
  //
  //   switch (report.type) {
  //     case ReportEnum.APPROVE_ADD_BRAND_OR_MODEL_AUTO:
  //       const reportCar = await this.reportRepository.getReportCar(reportId);
  //       await this.reportCarRepository.save(reportCar);
  //       break;
  //     case ReportEnum.APPROVE_ADD_REGION:
  //       const reportRegion =
  //         await this.reportRepository.getReportRegion(reportId);
  //       await this.reportRegionRepository.save(reportRegion);
  //       break;
  //     case ReportEnum.APPROVE_CHANGE_AD_AUTO_MORE_THAN_3_TIMES:
  //       const reportAfter3Changes =
  //         await this.reportRepository.getReportAfter3Changes(reportId);
  //       await this.reportAfter3ChangesRepository.save(reportAfter3Changes);
  //       break;
  //     default:
  //       throw new BadRequestException('Invalid report type');
  //   }
  // }
}
