import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CarID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarReqDto } from '../dto/req/car.req.dto';
import { ListCarsQueryDto } from '../dto/req/list-cars.query.dto';
import { UpdateCarReqDto } from '../dto/req/update-car.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarsListResDto } from '../dto/res/cars-list.res.dto';
import { CarMapper } from '../mapper/car.mapper';
import { CarsService } from '../services/cars.service';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @SkipAuth()
  @Get('getAllCars')
  public async getCars(
    @Query() query: ListCarsQueryDto,
  ): Promise<CarsListResDto> {
    const [entities, total] = await this.carsService.getCars(query);
    return CarMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @Post('createCar')
  public async createCar(
    @CurrentUser() userData: IUserData,
    @Body() dto: CarReqDto,
  ): Promise<CarResDto> {
    return CarMapper.toResDto(await this.carsService.createCar(userData, dto));
  }

  @ApiBearerAuth()
  @Patch(':carId')
  public async updateCar(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateCarReqDto,
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<CarResDto> {
    return CarMapper.toResDto(
      await this.carsService.updateCar(userData, dto, carId),
    );
  }

  @SkipAuth()
  @Get(':carId')
  public async getCar(
    @Param('carId', ParseUUIDPipe) carId: CarID,
  ): Promise<CarResDto> {
    return CarMapper.toResDto(await this.carsService.getCar(carId));
  }
}
