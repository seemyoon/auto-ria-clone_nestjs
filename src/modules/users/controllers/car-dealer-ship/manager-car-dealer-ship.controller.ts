import {
  Body,
  Controller,
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
import { ManagerCarDealerShipService } from '../../services/car-dealer-ship/manager-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('Managers-CarDealership (in future)')
@Controller('manager-car-dealership')
export class ManagerCarDealerShipController {
  constructor(
    private readonly managerCarDealerShipController: ManagerCarDealerShipService,
  ) {}

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatarForSeller(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.managerCarDealerShipController.uploadAvatarForCarDealerShipManager(
      userData,
      file,
    );
  }

  @ApiOperation({ deprecated: true })
  @Post('createManager')
  public async createManager(@Body() dto: any): Promise<void> {
    await this.managerCarDealerShipController.createManager(dto);
  }
}
