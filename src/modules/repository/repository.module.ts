import { Global, Module } from '@nestjs/common';

import { ArticleRepository } from './service/article.repository';
import { CarRepository } from './service/car.repository';
import { CarCostRepository } from './service/car-cost.repository';
import { CarDealerShipRepository } from './service/car-dealership.repository';
import { RefreshTokenRepository } from './service/refresh-token.repository';
import { SubscribeRepository } from './service/subscribe.repository';
import { UserRepository } from './service/user.repository';

const repository = [
  UserRepository,
  ArticleRepository,
  RefreshTokenRepository,
  CarRepository,
  CarCostRepository,
  CarDealerShipRepository,
  SubscribeRepository,
];

@Global()
@Module({
  providers: [...repository],
  exports: [...repository],
})
export class RepositoryModule {}
