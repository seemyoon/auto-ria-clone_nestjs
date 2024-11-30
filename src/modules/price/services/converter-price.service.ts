import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

import { API_URL_PRIVAT24 } from '../../../constants/common.constants';
import { ArticleRepository } from '../../repository/service/article.repository';
import { CurrencyService } from './currency.service';

@Injectable()
export class ConverterPriceService {
  private readonly logger = new Logger(ConverterPriceService.name);
  private axiosInstance = axios.create({
    baseURL: API_URL_PRIVAT24,
  });

  constructor(
    private readonly currencyService: CurrencyService,
    private readonly articleRepository: ArticleRepository,
  ) {}

  public getCurrency = async () => {
    try {
      const { data } = await this.axiosInstance.get(
        this.axiosInstance.defaults.baseURL,
      );
      for (const item of data) {
        await this.currencyService.storeCurrency(item.ccy, item.sale);
      }
    } catch (error) {
      this.logger.error(error);
    }
  };

  updateCurrency = async () => {
    try {
      const articles = await this.articleRepository.find();
      for (const article of articles) {
        const currency = await this.currencyService.getCurrency(
          article.currency,
        );
        const newPrice = article.cost * currency;
        await this.articleRepository.update(article.id, {
          costUAH: newPrice,
          currencyRate: currency,
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  };

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    this.getCurrency();
    this.updateCurrency();
  }
}
