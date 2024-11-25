import { ListRegionsQueryDto } from '../req/list-regions.query.dto';
import { RegionResDto } from './region.res.dto';

export class RegionListResDto extends ListRegionsQueryDto {
  data: RegionResDto[];
  total: number;
}
