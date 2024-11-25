import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListRegionsQueryDto } from '../dto/req/list-regions.query.dto';
import { RegionListResDto } from '../dto/res/region-list.res.dto';
import { RegionMapper } from '../mapper/region.mapper';
import { RegionService } from '../services/region.service';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  public async getRegions(
    @Query() query: ListRegionsQueryDto,
  ): Promise<RegionListResDto> {
    const [entities, total] = await this.regionService.getRegions(query);
    return RegionMapper.toResDtoList(entities, total, query);
  }

  @Get(':regionId')
  public async getRegion(
    @Param('id', ParseUUIDPipe) regionId: string,
  ): Promise<void> {
    await this.regionService.getRegion();
  }

  @Post()
  public async createRegion(): Promise<void> {
    await this.regionService.createRegion();
  }
}
