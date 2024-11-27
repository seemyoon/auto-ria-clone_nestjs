import { BadRequestException, Injectable } from '@nestjs/common';

import { ReportID } from '../../../common/types/entity-ids.type';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarReqDto } from '../../cars/dto/req/car.req.dto';
import { RegionReqDto } from '../../region/dto/req/region.req.dto';
import { ReportRepository } from '../../repository/service/report.repository';
import { ReportAfter3ChangesRepository } from '../../repository/service/report-after-3-changes.repository';
import { ReportCarRepository } from '../../repository/service/report-car.repository';
import { ReportRegionRepository } from '../../repository/service/report-region.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UserEnum } from '../../users/enum/users.enum';
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

  public async getReports(userData: IUserData): Promise<void> {}

  public async addCarReport(
    userData: IUserData,
    dto: CarReqDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (![UserEnum.SELLER, UserEnum.DEALERSHIP_SELLER].includes(user.role)) {
      try {
        if (dto.brand || dto.model) {
          const reportType = ReportEnum.APPROVE_ADD_BRAND_OR_MODEL_AUTO;
          const brand = dto.brand;
          const model = dto.model;

          // await this.reportRepository.save(
          //   this.reportRepository.create({
          //     place: dto.region,
          // return {
          //   brand,
          //   model,
          //   reportType,
          // };
        }
      } catch (error) {
        throw new BadRequestException('Invalid type');
      }
    } else if (![UserEnum.ADMIN, UserEnum.MANAGER].includes(user.role)) {
      throw new BadRequestException(
        'You are an admin or manager, so you can do that with another endpoint',
      );
    } else {
      throw new BadRequestException('Invalid role');
    }
  }

  public async addRegionReport(
    userData: IUserData,
    dto: RegionReqDto,
  ): Promise<void> {
    if (dto.region) {
      const reportType = ReportEnum.APPROVE_ADD_REGION;
    }
    // try {
    //   if (dto.region) {
    //     const reportType = ReportEnum.APPROVE_ADD_REGION;
    //   }
    // } catch (error) {
    //   throw new BadRequestException('Invalid role');
    // }
  }

  public async approveReport(
    userData: IUserData,
    reportId: ReportID,
  ): Promise<void> {}
}
