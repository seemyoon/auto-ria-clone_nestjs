import { Module } from '@nestjs/common';

import { RedisModule } from '../redis/redis.module';
import { ConverterPriceService } from './services/converter-price.service';
import { CurrencyService } from './services/currency.service';

@Module({
  imports: [RedisModule],
  providers: [ConverterPriceService, CurrencyService],
})
export class PriceModule {}
