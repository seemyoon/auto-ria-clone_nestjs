import { Module } from '@nestjs/common';

import { RegionController } from './controllers/region.controller';
import { RegionsService } from './services/regions.service';

@Module({
  controllers: [RegionController],
  providers: [RegionsService], //todo CarsDealerShip
})
export class RegionsModule {}
