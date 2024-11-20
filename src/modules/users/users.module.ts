import { Module } from '@nestjs/common';

import { AdminCarDealerShipController } from './controllers/car-dealer-ship/admin-car-dealer-ship.controller';
import { ManagerCarDealerShipController } from './controllers/car-dealer-ship/manager-car-dealer-ship.controller';
import { SellerCarDealerShipController } from './controllers/car-dealer-ship/seller-car-dealer-ship.controller';
import { AdminController } from './controllers/users-of-the-entire-platform/admin.controller';
import { ManagerController } from './controllers/users-of-the-entire-platform/manager.controller';
import { SellerController } from './controllers/users-of-the-entire-platform/seller.controller';
import { AdminCarDealerShipService } from './services/car-dealer-ship/admin-car-dealer-ship.service';
import { ManagerCarDealerShipService } from './services/car-dealer-ship/manager-car-dealer-ship.service';
import { SellerCarDealerShipService } from './services/car-dealer-ship/seller-car-dealer-ship.service';
import { AdminService } from './services/users-of-the-entire-platform/admin.service';
import { ManagerService } from './services/users-of-the-entire-platform/manager.service';
import { SellerService } from './services/users-of-the-entire-platform/seller.service';

const usersControllers = [AdminController, ManagerController, SellerController];
const usersCarDealerShipControllers = [
  AdminCarDealerShipController,
  ManagerCarDealerShipController,
  SellerCarDealerShipController,
];
const usersServices = [
  AdminCarDealerShipService,
  ManagerCarDealerShipService,
  SellerCarDealerShipService,
];
const usersCarDealerShipServices = [
  AdminService,
  ManagerService,
  SellerService,
];

@Module({
  controllers: [...usersControllers, ...usersCarDealerShipControllers],
  providers: [...usersServices, ...usersCarDealerShipServices],
})
export class UsersModule {}
