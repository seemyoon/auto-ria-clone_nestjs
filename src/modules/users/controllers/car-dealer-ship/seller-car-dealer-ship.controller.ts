import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
}
