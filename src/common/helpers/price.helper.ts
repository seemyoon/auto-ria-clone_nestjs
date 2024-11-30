import { Injectable } from '@nestjs/common';

import { CurrencyEnum } from '../../modules/price/enum/currency.enum';
import { CurrencyService } from '../../modules/price/services/currency.service';

@Injectable()
export class PriceHelper {
  public static async getConvertedPrice(
    currencyService: CurrencyService,
    currency: CurrencyEnum,
    cost: number,
  ): Promise<{ currencyRate: number; costUAH: number }> {
    const currencyRate = await currencyService.getCurrency(currency);
    const costUAH = await this.convertInUAH(currency, cost, currencyService);
    return { currencyRate, costUAH };
  }

  public static async convertInUAH(
    currency: CurrencyEnum,
    quantity: number,
    currencyService: CurrencyService,
  ): Promise<number> {
    if (currency === CurrencyEnum.UAH) {
      return quantity;
    }
    const currencyRate = await currencyService.getCurrency(currency);
    return Math.round(quantity * currencyRate);
  }
}
