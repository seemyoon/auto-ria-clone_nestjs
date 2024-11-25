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
import { ListRegionsQueryDto } from '../dto/req/list-regions.query.dto';
import { RegionsService } from '../services/regions.service';

@ApiBearerAuth()
@ApiTags('Regions')
@Controller('regions')
export class RegionController {
  constructor(private readonly regionsService: RegionsService) {}

  @SkipAuth()
  @Get()
  public async getRegions(@Query() query: ListRegionsQueryDto): Promise<void> {
    await this.regionsService.getRegions();
  }

  @SkipAuth()
  @Get(':regionId')
  public async getRegion(
    @Param('id', ParseUUIDPipe) regionId: string,
  ): Promise<void> {
    await this.regionsService.getRegion();
  }

  @ApiBearerAuth()
  @Post()
  public async createRegion(): Promise<void> {
    await this.regionsService.createRegion();
  }
}
