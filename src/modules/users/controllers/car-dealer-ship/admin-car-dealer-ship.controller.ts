import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @Patch()
  public async editAdmin(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.adminCarDealerShipService.editAdmin(userId, dto);
  }
}
