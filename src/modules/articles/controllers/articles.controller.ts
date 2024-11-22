import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';
import { ArticleService } from '../services/articles.service';

@ApiBearerAuth()
@ApiTags('CarArticle')
@Controller('carArticle')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  @SkipAuth()
  @Get()
  public async getCarArticles(
    @Query() query: ListUsersQueryDto,
  ): Promise<void> {
    // todo ArticleListResDto
    // const [entities, total] = await this.articleService.getCarArticles();
    // return UserMapper.toResDtoList(entities, total, query);
  }

  @SkipAuth()
  @Get(':carArticleId')
  public async getCarArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    // todo ArticleSellerResDto
    await this.articleService.getCarArticle();
  }

  @Post()
  public async createCarArticle(): Promise<void> {
    // todo ArticleSellerResDto
    await this.articleService.createCarArticle();
  }

  @Delete(':carArticleId')
  public async deleteCarArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    // todo ArticleSellerResDto
    await this.articleService.deleteCarArticle();
  }

  @Patch(':carArticleId')
  public async editCarArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    // todo ArticleSellerResDto
    await this.articleService.editCarArticle();
  }

  // @Post(':carArticleId/favourite')
  // public async favouriteCarArticle(
  //   @Param('id', ParseUUIDPipe) userId: string,
  // ): Promise<void> {
  //   await this.articleService.favouriteCarArticle();
  // } // todo if i have time
}
