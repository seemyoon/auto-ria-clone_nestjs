import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SellerService } from '../../services/users-of-the-entire-platform/seller.service';

@ApiBearerAuth()
@ApiTags('Sellers')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Get()
  public async getSeller(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.sellerService.getSeller(userId);
  }

  @Patch()
  public async editSeller(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.sellerService.editSeller(userId, dto);
  }

  @Patch('banned')
  public async bannedSeller(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: any,
  ): Promise<void> {
    await this.sellerService.bannedSeller(userId, dto);
  }
}
