import {
  Body,
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

import { ArticleID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';
import { BaseArticleReqDto } from '../dto/req/article.req.dto';
import { ArticleListResDto } from '../dto/res/article-list.res.dto';
import { ArticleSellerBaseResDto } from '../dto/res/article-seller-base-res.dto';
import { ArticleSellerPremiumResDto } from '../dto/res/article-seller-premium.res.dto';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticleService } from '../services/articles.service';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticleService) {}

  @SkipAuth()
  @Get()
  public async getArticles(
    @Query() query: ListUsersQueryDto,
  ): Promise<ArticleListResDto> {
    const [entities, total] = await this.articleService.getArticles(query);
    return ArticleMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @Post()
  public async createArticle(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseArticleReqDto,
  ): Promise<ArticleSellerBaseResDto> {
    return ArticleMapper.toBaseResDto(
      await this.articleService.createArticle(userData, dto),
    );
  }

  @SkipAuth()
  @Get(':articleId')
  public async getArticle(
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<ArticleSellerBaseResDto> {
    return ArticleMapper.toBaseResDto(
      await this.articleService.getArticle(articleId),
    );
  }

  @ApiBearerAuth()
  @Delete(':articleId')
  public async deleteArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.articleService.deleteArticle();
  }

  @ApiBearerAuth()
  @Patch(':articleId')
  public async editArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    // todo ArticleSellerResDto
    await this.articleService.editArticle();
  }

  @ApiBearerAuth()
  @Get(':articleId/premiumInfo')
  public async getPremiumInfo(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<ArticleSellerPremiumResDto> {
    return await this.articleService.getPremiumInfoArticle(userData, articleId);
  }
}
