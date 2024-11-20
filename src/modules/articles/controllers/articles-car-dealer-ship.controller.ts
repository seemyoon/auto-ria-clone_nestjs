import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ArticleService } from '../services/articles.service';

@ApiBearerAuth()
@ApiTags('CarArticleDealerShip (in future)')
@Controller('article-car-dealership')
export class ArticlesCarDealerShipController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ deprecated: true })
  @Get()
  public async getCarArticles(): Promise<void> {
    await this.articleService.getCarArticles();
  }

  @ApiOperation({ deprecated: true })
  @Get(':carArticleId')
  public async getCarArticle(): Promise<void> {
    await this.articleService.getCarArticle();
  }

  @ApiOperation({ deprecated: true })
  @Post()
  public async createCarArticle(): Promise<void> {
    await this.articleService.createCarArticle();
  }

  @ApiOperation({ deprecated: true })
  @Delete(':carArticleId')
  public async deleteCarArticle(): Promise<void> {
    await this.articleService.deleteCarArticle();
  }

  @ApiOperation({ deprecated: true })
  @Patch(':carArticleId')
  public async editCarArticle(): Promise<void> {
    await this.articleService.editCarArticle();
  }

  @ApiOperation({ deprecated: true })
  @Post(':carArticleId/favourite')
  public async favouriteCarArticle(): Promise<void> {
    await this.articleService.favouriteCarArticle();
  }
}
