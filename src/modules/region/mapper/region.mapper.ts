import { Injectable } from '@nestjs/common';

import { RegionEntity } from '../../../database/entities/region.entity';
import { ListRegionsQueryDto } from '../dto/req/list-regions.query.dto';
import { RegionResDto } from '../dto/res/region.res.dto';
import { RegionListResDto } from '../dto/res/region-list.res.dto';

@Injectable()
export class RegionMapper {
  public static toResDto(data: RegionEntity): RegionResDto {
    return {
      id: data.id,
      place: data.place,
    };
  }

  public static toResDtoList(
    data: RegionEntity[],
    total: number,
    query: ListRegionsQueryDto,
  ): RegionListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
