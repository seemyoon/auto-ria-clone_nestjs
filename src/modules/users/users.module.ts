import { Module } from '@nestjs/common';

import { UserCarDealerShipController } from './controllers/user-car-dealer-ship.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CarDealerShipService } from './services/users-car-dealer-ship.service';

@Module({
  controllers: [UsersController, UserCarDealerShipController],
  providers: [UsersService, CarDealerShipService],
})
export class UsersModule {}
