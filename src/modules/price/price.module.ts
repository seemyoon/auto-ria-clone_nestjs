import { Module } from '@nestjs/common';

import { PriceService } from './services/price.service';

@Module({
  providers: [PriceService],
  exports: [PriceService],
})
export class PriceModule {}
