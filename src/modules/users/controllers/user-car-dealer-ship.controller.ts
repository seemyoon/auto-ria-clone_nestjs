import { Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CarDealerShipService } from '../services/users-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('CarDealership (in future)')
@Controller('car-dealership')
export class UserCarDealerShipController {
  constructor(
    private readonly usersService: UsersService,
    private readonly carDealerShipService: CarDealerShipService,
  ) {}

  @Get('seller')
  public async getSeller(): Promise<void> {
    await this.usersService.getSeller();
  }

  @Patch('seller/bannedSeller')
  public async bannedSeller(): Promise<void> {
    await this.usersService.bannedSeller();
  }

  @Post('createManager')
  public async createManager(): Promise<void> {
    await this.usersService.createManager();
  }

  @Post('createAdmin')
  public async createAdmin(): Promise<void> {
    await this.carDealerShipService.createAdmin();
  }
}
