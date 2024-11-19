import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { ArticleService } from '../services/articles.service';

@Controller('carArticle')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  public async getCarArticles() {
    await this.articleService.getCarArticles();
  }

  @Get(':carArticleId')
  public async getCarArticle() {
    await this.articleService.getCarArticle();
  }

  @Post()
  public async createCarArticle() {
    await this.articleService.createCarArticle();
  }

  @Delete(':carArticleId')
  public async deleteCarArticle() {
    await this.articleService.deleteCarArticle();
  }

  @Patch(':carArticleId')
  public async editCarArticle() {
    await this.articleService.editCarArticle();
  }

  @Post(':carArticleId/favourite')
  public async favouriteCarArticle() {
    await this.articleService.favouriteCarArticle();
  }
}
