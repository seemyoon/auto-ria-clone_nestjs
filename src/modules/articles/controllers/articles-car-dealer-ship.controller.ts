import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ArticleService } from '../services/articles.service';

@ApiBearerAuth()
@ApiTags('CarArticleDealerShip (in future)')
@Controller('article-car-dealership')
export class ArticlesCarDealerShipController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  public async getCarArticles(): Promise<void> {
    await this.articleService.getCarArticles();
  }

  @Get(':carArticleId')
  public async getCarArticle(): Promise<void> {
    await this.articleService.getCarArticle();
  }

  @Post()
  public async createCarArticle(): Promise<void> {
    await this.articleService.createCarArticle();
  }

  @Delete(':carArticleId')
  public async deleteCarArticle(): Promise<void> {
    await this.articleService.deleteCarArticle();
  }

  @Patch(':carArticleId')
  public async editCarArticle(): Promise<void> {
    await this.articleService.editCarArticle();
  }

  @Post(':carArticleId/favourite')
  public async favouriteCarArticle(): Promise<void> {
    await this.articleService.favouriteCarArticle();
  }
}
