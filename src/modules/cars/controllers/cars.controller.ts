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
import { ListCarsQueryDto } from '../dto/req/list-cars.query.dto';
import { CarsService } from '../services/cars.service';

@ApiBearerAuth()
@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @SkipAuth()
  @Get()
  public async getCars(@Query() query: ListCarsQueryDto): Promise<void> {
    await this.carsService.getCars();
  }

  @SkipAuth()
  @Get(':carId')
  public async getCar(
    @Param('id', ParseUUIDPipe) carId: string,
  ): Promise<void> {
    await this.carsService.getCar();
  }

  @ApiBearerAuth()
  @Post('create')
  public async createCar(): Promise<void> {
    await this.carsService.createCar();
  }
}
