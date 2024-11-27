import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './service/article.repository';
import { CarRepository } from './service/car.repository';
import { CarDealerShipRepository } from './service/car-dealership.repository';
import { RefreshTokenRepository } from './service/refresh-token.repository';
import { RegionRepository } from './service/region.repository';
import { ReportRepository } from './service/report.repository';
import { ReportAfter3ChangesRepository } from './service/report-after-3-changes.repository';
import { ReportCarRepository } from './service/report-car.repository';
import { ReportRegionRepository } from './service/report-region.repository';
import { SubscribeRepository } from './service/subscribe.repository';
import { UserRepository } from './service/user.repository';

const repository = [
  UserRepository,
  ArticleRepository,
  RefreshTokenRepository,
  CarRepository,
  RegionRepository,
  ReportRepository,
  ReportCarRepository,
  ReportAfter3ChangesRepository,
  ReportRegionRepository,
  CarDealerShipRepository,
  SubscribeRepository,
];

@Global()
@Module({
  providers: [...repository],
  exports: [...repository],
})
export class RepositoryModule {}
