import {
  Body,
  Controller,
  Delete,
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
import { SellerCarDealerShipService } from '../../services/car-dealer-ship/seller-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('Sellers-CarDealership (in future)')
@Controller('seller-car-dealership')
export class SellerCarDealerShipController {
  constructor(
    private readonly sellerCarDealerShipService: SellerCarDealerShipService,
  ) {}

  @ApiOperation({ deprecated: true })
  @Get('seller')
  public async getSeller(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.sellerCarDealerShipService.getSeller(userId);
  }

  @ApiOperation({ deprecated: true })
  @Patch('seller')
  public async editSeller(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.sellerCarDealerShipService.editSeller(userId, dto);
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
    await this.sellerCarDealerShipService.uploadAvatarForCarDealerShipSeller(
      userData,
      file,
    );
  }

  @ApiOperation({ deprecated: true })
  @Patch('banned')
  public async bannedSeller(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.sellerCarDealerShipService.bannedSeller(userId, dto);
  }

  @ApiOperation({ deprecated: true })
  @Post('subscribe')
  public async subscribe(
    // @CurrentUser('id') userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.sellerCarDealerShipService.subscribe(dto);
  }

  @ApiOperation({ deprecated: true })
  @Delete('subscribe')
  public async unsubscribe(): Promise<void> {
    await this.sellerCarDealerShipService.unsubscribe();
  }

  //toDo thinking about subscribe and unsubscribe for car-dealer-ship sellers
}
