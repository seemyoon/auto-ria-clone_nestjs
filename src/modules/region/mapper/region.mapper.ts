import { Injectable } from '@nestjs/common';

import { RegionEntity } from '../../../database/entities/region.entity';
import { RegionResDto } from '../dto/res/region.res.dto';

@Injectable()
export class RegionMapper {
  public static toResDto(data: RegionEntity): RegionResDto {
    return {
      id: data.id,
      region: data.region,
      created: data.created,
      updated: data.updated,
    };
  }
}
