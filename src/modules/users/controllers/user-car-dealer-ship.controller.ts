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

import { ApiFile } from '../../../common/decorators/api-file.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserCarDealerShipService } from '../services/user-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('Users-CarDealership (in future)')
@Controller('user-car-dealership')
export class UserCarDealerShipController {
  constructor(
    private readonly userCarDealerShipService: UserCarDealerShipService,
  ) {}

  @ApiOperation({ deprecated: true })
  @Get('getMe')
  public async getMe(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.userCarDealerShipService.getSeller(userId);
  }

  @ApiOperation({ deprecated: true })
  @Patch('updateMe')
  public async editSeller(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.userCarDealerShipService.editSeller(userId, dto);
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
    await this.userCarDealerShipService.uploadAvatarForCarDealerShipSeller(
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
    await this.userCarDealerShipService.bannedSeller(userId, dto);
  }

  @ApiOperation({ deprecated: true })
  @Post('subscribe')
  public async subscribe(
    // @CurrentUser('id') userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.userCarDealerShipService.subscribe(dto);
  }

  @ApiOperation({ deprecated: true })
  @Delete('subscribe')
  public async unsubscribe(): Promise<void> {
    await this.userCarDealerShipService.unsubscribe();
  }

  @ApiOperation({ deprecated: true })
  @Post('createMechanic')
  public async createMechanic(@Body() dto: any): Promise<void> {
    await this.userCarDealerShipService.createMechanic(dto);
  }

  @ApiOperation({ deprecated: true })
  @Post('createManager')
  public async createManager(@Body() dto: any): Promise<void> {
    await this.userCarDealerShipService.createManager(dto);
  }

  @ApiOperation({ deprecated: true })
  @Get()
  public async getAdmin(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.userCarDealerShipService.getAdmin(userId);
  }

  @ApiOperation({ deprecated: true })
  @Post()
  public async createAdmin(@Body() dto: any): Promise<void> {
    await this.userCarDealerShipService.createAdmin(dto);
  }

  //toDo thinking about subscribe and unsubscribe for car-dealer-ship sellers
}
