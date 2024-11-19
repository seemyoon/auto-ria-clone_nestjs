import { Controller, Get, Patch, Post } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CarDealerShipService } from '../services/users-car-dealer-ship.service';

@Controller('car-dealership')
export class UserCarDealerShipController {
  constructor(
    private readonly usersService: UsersService,
    private readonly carDealerShipService: CarDealerShipService,
  ) {}

  @Get('seller')
  public async getSeller() {
    await this.usersService.getSeller();
  }

  @Patch('seller/bannedSeller')
  public async bannedSeller() {
    await this.usersService.bannedSeller();
  }

  @Post('createManager')
  public async createManager() {
    await this.usersService.createManager();
  }

  @Post('create-admin')
  public async createAdmin() {
    await this.carDealerShipService.createAdmin();
  }
}
