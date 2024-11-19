import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ArticleService } from '../services/articles.service';

@ApiBearerAuth()
@ApiTags('CarArticle')
@Controller('carArticle')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  public async getCarArticles(): Promise<void> {
    await this.articleService.getCarArticles();
  }

  @Get(':carArticleId')
  public async getCarArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.articleService.getCarArticle();
  }

  @Post()
  public async createCarArticle(): Promise<void> {
    await this.articleService.createCarArticle();
  }

  @Delete(':carArticleId')
  public async deleteCarArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.articleService.deleteCarArticle();
  }

  @Patch(':carArticleId')
  public async editCarArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.articleService.editCarArticle();
  }

  @Post(':carArticleId/favourite')
  public async favouriteCarArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.articleService.favouriteCarArticle();
  }
}
