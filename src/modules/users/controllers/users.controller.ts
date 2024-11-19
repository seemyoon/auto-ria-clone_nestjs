import { Controller, Get, Patch, Post } from '@nestjs/common';

import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
