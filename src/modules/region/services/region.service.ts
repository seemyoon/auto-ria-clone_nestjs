import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { BadRequestException, Injectable } from '@nestjs/common';

import { RegionID } from '../../../common/types/entity-ids.type';
import { RegionEntity } from '../../../database/entities/region.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { RegionRepository } from '../../repository/service/region.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UserEnum } from '../../users/enum/users.enum';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';
import { RegionReqDto } from '../dto/req/region.req.dto';

@Injectable()
export class RegionService {
  constructor(
    private readonly regionRepository: RegionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getRegions(
    query: ListUsersQueryDto,
  ): Promise<[RegionEntity[], number]> {
    return await this.regionRepository.findAll(query);
  }

  public async uploadRegions(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (![UserEnum.ADMIN, UserEnum.MANAGER].includes(user.role)) {
      throw new BadRequestException('Invalid role');
    }
    const regionsInDB = await this.regionRepository.find();

    const regions = JSON.parse(
      await fs.readFile(
        path.resolve(__dirname, '../../../json/ua_cities.json'),
        'utf-8',
      ),
    );

    if (regionsInDB.length < regions.length) {
      const existingCities = regionsInDB.map((region: RegionEntity) =>
        region.place.toLowerCase(),
      );
      const newRegions = regions
        .filter(
          (newRegion: any): boolean =>
            !existingCities.includes(newRegion.city.toLowerCase()),
        )
        .map((newRegion: any) => {
          const region = new RegionEntity();
          region.place = newRegion.city;
          return region;
        });

      await this.regionRepository.save(newRegions);
      console.log(
        'Missing cities have been successfully loaded into the database.',
      );
    } else {
      console.log('All cities are already loaded.'); //todo try/catch
    }
  }

  public async getRegion(regionId: RegionID): Promise<RegionEntity> {
    const region = await this.regionRepository.findByRegionId(regionId);
    if (!region) {
      throw new BadRequestException('Region not found');
    }
    return region;
  }

  public async createRegion(dto: RegionReqDto): Promise<RegionEntity> {
    const regionsInDB = await this.regionRepository.find();
    if (regionsInDB.length <= 1) {
      throw new BadRequestException('DB did not fill');
    }
    const existingCities = regionsInDB.map((region: RegionEntity) =>
      region.place.toLowerCase(),
    );
    if (existingCities.includes(dto.region.toLowerCase())) {
      throw new BadRequestException('Region already exists');
    }

    return await this.regionRepository.save(
      this.regionRepository.create({
        place: dto.region,
      }),
    );
  }
}
