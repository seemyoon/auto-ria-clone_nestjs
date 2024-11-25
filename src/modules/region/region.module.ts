import { Module } from '@nestjs/common';

import { RegionController } from './controllers/region.controller';
import { RegionService } from './services/region.service';

@Module({
  controllers: [RegionController],
  providers: [RegionService], //todo CarsDealerShip
})
export class RegionModule {}
