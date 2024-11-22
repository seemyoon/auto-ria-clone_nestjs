import { Module } from '@nestjs/common';

import { CarRegionsController } from './controllers/car-regions.controller';
import { CarRegionsService } from './services/car-regions.service';

@Module({
  controllers: [CarRegionsController],
  providers: [CarRegionsService], //todo CarsDealerShip
})
export class CarRegionsModule {}
