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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ApiFile } from '../../../../common/decorators/api-file.decorator';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { IUserData } from '../../../auth/interfaces/user-data.interface';
import { AdminCarDealerShipService } from '../../services/car-dealer-ship/admin-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('Admin-CarDealership (in future)')
@Controller('admin-car-dealership')
export class AdminCarDealerShipController {
  constructor(
    private readonly adminCarDealerShipService: AdminCarDealerShipService,
  ) {}

  @ApiOperation({ deprecated: true })
  @Get()
  public async getAdmin(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.adminCarDealerShipService.getAdmin(userId);
  }

  @ApiOperation({ deprecated: true })
  @Post()
  public async createAdmin(@Body() dto: any): Promise<void> {
    await this.adminCarDealerShipService.createAdmin(dto);
  }

  @ApiOperation({ deprecated: true })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatarForSeller(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.adminCarDealerShipService.uploadAvatarForCarDealerShipAdmin(
      userData,
      file,
    );
  }

  @ApiOperation({ deprecated: true })
  @Patch()
  public async editAdmin(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.adminCarDealerShipService.editAdmin(userId, dto);
  }
}
