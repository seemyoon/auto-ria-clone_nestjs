import { Injectable } from '@nestjs/common';

import { CarRegionsEntity } from '../../../database/entities/car-regions.entity';
import { CarResRegionsDto } from '../dto/res/car-region.res.dto';

@Injectable()
export class CarRegionsMapper {
  public static toResDto(data: CarRegionsEntity): CarResRegionsDto {
    return {
      id: data.id,
      region: data.region,
      created: data.created,
      updated: data.updated,
    };
  }
}
