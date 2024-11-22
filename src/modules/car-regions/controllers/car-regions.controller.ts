import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ListCarsRegionsQueryDto } from '../dto/req/list-cars-regions.query.dto';
import { CarRegionsService } from '../services/car-regions.service';

@ApiBearerAuth()
@ApiTags('CarsRegions')
@Controller('carsRegions')
export class CarRegionsController {
  constructor(private readonly carsRegionsService: CarRegionsService) {}

  @SkipAuth()
  @Get()
  public async getCarsRegions(
    @Query() query: ListCarsRegionsQueryDto,
  ): Promise<void> {
    await this.carsRegionsService.getCarsRegions();
  }

  @SkipAuth()
  @Get(':regionId')
  public async getCarRegion(
    @Param('id', ParseUUIDPipe) regionId: string,
  ): Promise<void> {
    await this.carsRegionsService.getCarRegion();
  }

  @ApiBearerAuth()
  @Post()
  public async createCarRegion(): Promise<void> {
    await this.carsRegionsService.createCarRegion();
  }
}
