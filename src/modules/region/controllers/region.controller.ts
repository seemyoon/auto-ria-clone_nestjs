import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ListRegionsQueryDto } from '../dto/req/list-regions.query.dto';
import { RegionsService } from '../services/regions.service';

@ApiBearerAuth()
@ApiTags('Regions')
@Controller('regions')
export class RegionController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  public async getRegions(@Query() query: ListRegionsQueryDto): Promise<void> {
    await this.regionsService.getRegions();
  }

  @Get(':regionId')
  public async getRegion(
    @Param('id', ParseUUIDPipe) regionId: string,
  ): Promise<void> {
    await this.regionsService.getRegion();
  }

  @Post()
  public async createRegion(): Promise<void> {
    await this.regionsService.createRegion();
  }
}
