import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AdminService } from '../../services/users-of-the-entire-platform/admin.service';

@ApiBearerAuth()
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  public async getAdmin(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.adminService.getAdmin(userId);
  }

  @Patch()
  public async editAdmin(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.adminService.editAdmin(userId, dto);
  }

  @Post()
  public async createAdmin(@Body() dto: any): Promise<void> {
    await this.adminService.createAdmin(dto);
  }
}
