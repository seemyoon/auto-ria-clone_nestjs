import { Injectable } from '@nestjs/common';

import { CarEntity } from '../../../database/entities/car.entity';
import { ListCarsQueryDto } from '../dto/req/list-cars.query.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarsListResDto } from '../dto/res/cars-list.res.dto';

@Injectable()
export class CarMapper {
  public static toResDto(data: CarEntity): CarResDto {
    return {
      id: data?.id,
      brand: data?.brand,
      model: data?.model,
      created: data.createdAt,
      updated: data.updatedAt,
    };
  }

  public static toResDtoList(
    data: CarEntity[],
    total: number,
    query: ListCarsQueryDto,
  ): CarsListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
