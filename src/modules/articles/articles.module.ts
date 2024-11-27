import { Module } from '@nestjs/common';

import { ArticlesController } from './controllers/articles.controller';
import { ArticleService } from './services/articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticleService],
})
export class ArticlesModule {}
