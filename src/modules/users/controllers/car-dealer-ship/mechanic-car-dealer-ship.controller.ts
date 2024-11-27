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
import { MechanicCarDealerShipService } from '../../services/car-dealer-ship/mechanic-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('Mechanic-CarDealership (in future)')
@Controller('mechanic-car-dealership')
export class MechanicCarDealerShipController {
  constructor(
    private readonly mechanicCarDealerShipController: MechanicCarDealerShipService,
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
    await this.mechanicCarDealerShipController.uploadAvatarForCarDealerShipMechanic(
      userData,
      file,
    );
  }

  @ApiOperation({ deprecated: true })
  @Post('createMechanic')
  public async createMechanic(@Body() dto: any): Promise<void> {
    await this.mechanicCarDealerShipController.createMechanic(dto);
  }
}
