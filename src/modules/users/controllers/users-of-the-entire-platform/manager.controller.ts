import {
  Body,
  Controller,
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
import { ManagerService } from '../../services/users-of-the-entire-platform/manager.service';

@ApiBearerAuth()
@ApiTags('Managers')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('createManager')
  public async createManager(@Body() dto: any): Promise<void> {
    await this.managerService.createManager(dto);
  }

  @Patch('editMe')
  public async editManager(@Body() dto: any): Promise<void> {
    await this.managerService.createManager(dto);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatarForManager(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.managerService.uploadAvatarForManager(userData, file);
  }
}
