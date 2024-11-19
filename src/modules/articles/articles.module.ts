import { Module } from '@nestjs/common';

import { ArticlesController } from './controllers/articles.controller';
import { ArticlesCarDealerShipController } from './controllers/articles-car-dealer-ship.controller';
import { ArticleService } from './services/articles.service';

@Module({
  controllers: [ArticlesController, ArticlesCarDealerShipController],
  providers: [ArticleService],
})
export class ArticlesModule {}
