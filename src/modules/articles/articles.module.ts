import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { CurrencyService } from '../price/services/currency.service';
import { RedisModule } from '../redis/redis.module';
import { ArticlesController } from './controllers/articles.controller';
import { ArticleService } from './services/articles.service';

@Module({
  imports: [RedisModule, AuthModule],
  controllers: [ArticlesController],
  providers: [ArticleService, CurrencyService],
  exports: [CurrencyService],
})
export class ArticlesModule {}
