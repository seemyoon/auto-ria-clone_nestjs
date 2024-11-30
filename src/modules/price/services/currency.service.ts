import { Injectable } from '@nestjs/common';

import { RedisService } from '../../redis/services/redis.service';
import { CurrencyEnum } from '../enum/currency.enum';

@Injectable()
export class CurrencyService {
  constructor(private readonly redisService: RedisService) {}

  public async storeCurrency(
    currencyType: CurrencyEnum,
    value: number,
  ): Promise<void> {
    const storageKey = this.buildKey(currencyType);
    await this.redisService.deleteByKey(storageKey);
    await this.redisService.addOneToSet(storageKey, value.toString());
  }

  public async getCurrency(currencyType: CurrencyEnum): Promise<number> {
    const storageKey = this.buildKey(currencyType);
    const values = await this.redisService.sMembers(storageKey);
    return values.length > 0 ? parseFloat(values[0]) : 0;
  }

  private buildKey(currencyType: CurrencyEnum): string {
    return `currency_value:${currencyType}`;
  }
}
