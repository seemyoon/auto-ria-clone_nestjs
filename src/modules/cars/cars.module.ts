import { Module } from '@nestjs/common';

import { CarsController } from './controllers/cars.controller';
import { CarsOfCarDealerShipController } from './controllers/cars-car-dealer-ship.controller';
import { CarsService } from './services/cars.service';
import { CarsOfCarDealerShipService } from './services/cars-dealer-ship.service';

@Module({
  controllers: [CarsController, CarsOfCarDealerShipController],
  providers: [CarsService, CarsOfCarDealerShipService],
})
export class CarsModule {}
