import { Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    await this.usersService.createAdmin();
  }
}
