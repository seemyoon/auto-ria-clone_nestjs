import { Injectable } from '@nestjs/common';

import { RegionEntity } from '../../../database/entities/region.entity';
import { RegionRepository } from '../../repository/service/region.repository';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';

@Injectable()
export class RegionService {
  constructor(private readonly regionRepository: RegionRepository) {}

  public async getRegions(
    query: ListUsersQueryDto,
  ): Promise<[RegionEntity[], number]> {
    return await this.regionRepository.findAll(query);
  }

  public async getRegion(): Promise<void> {}

  public async createRegion(): Promise<void> {}
}
