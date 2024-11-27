import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../../../common/decorators/api-file.decorator';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { IUserData } from '../../../auth/interfaces/user-data.interface';
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

  @Get()
  public async getSubscriptions(): Promise<void> {
    await this.adminService.getSubscriptions();
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatarForAdmin(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.adminService.uploadAvatarForAdmin(userData, file);
  }

  //todo check full info about car-article
}
