import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ListCarsQueryDto } from '../dto/req/list-cars.query.dto';
import { CarsOfCarDealerShipService } from '../services/cars-dealer-ship.service';

@ApiTags('CarsOfCarDealerShip (in future)')
@Controller('cars-of-car-dealership')
export class CarsOfCarDealerShipController {
  constructor(
    private readonly carsOfCarDealerShipService: CarsOfCarDealerShipService,
  ) {}

  @ApiOperation({ deprecated: true })
  @SkipAuth()
  @Get()
  public async getCars(@Query() query: ListCarsQueryDto): Promise<void> {
    await this.carsOfCarDealerShipService.getCars();
  }

  @ApiOperation({ deprecated: true })
  @SkipAuth()
  @Get(':carId')
  public async getCar(
    @Param('id', ParseUUIDPipe) carId: string,
  ): Promise<void> {
    await this.carsOfCarDealerShipService.getCar();
  }

  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  @Post()
  public async createCars(): Promise<void> {
    await this.carsOfCarDealerShipService.createCars();
  }
}
