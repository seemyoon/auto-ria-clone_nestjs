import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RegionID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListRegionsQueryDto } from '../dto/req/list-regions.query.dto';
import { RegionReqDto } from '../dto/req/region.req.dto';
import { RegionResDto } from '../dto/res/region.res.dto';
import { RegionListResDto } from '../dto/res/region-list.res.dto';
import { RegionMapper } from '../mapper/region.mapper';
import { RegionService } from '../services/region.service';

@ApiBearerAuth()
@ApiTags('Regions')
@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  public async getRegions(
    @Query() query: ListRegionsQueryDto,
  ): Promise<RegionListResDto> {
    const [entities, total] = await this.regionService.getRegions(query);
    return RegionMapper.toResDtoList(entities, total, query);
  }

  @Post()
  public async createRegion(@Body() dto: RegionReqDto): Promise<void> {
    await this.regionService.createRegion(dto);
  }

  @Post('uploadRegions')
  public async uploadRegionsFromJson(
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.regionService.uploadRegions(userData);
  }

  @Get(':regionId')
  public async getRegion(
    @Param('id', ParseUUIDPipe) regionId: RegionID,
  ): Promise<RegionResDto> {
    return RegionMapper.toResDto(await this.regionService.getRegion(regionId));
  } //todo fix with UUID and string
}
