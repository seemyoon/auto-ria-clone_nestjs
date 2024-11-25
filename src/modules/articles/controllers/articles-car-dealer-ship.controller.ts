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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';
import { BaseArticleReqDto } from '../dto/req/article.req.dto';
import { ArticleSellerBaseResDto } from '../dto/res/article-seller-base-res.dto';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticlesCarDealerShipService } from '../services/articles-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('ArticleDealerShip (in future)')
@Controller('article-car-dealership')
export class ArticlesCarDealerShipController {
  constructor(
    private readonly articlesCarDealerShipService: ArticlesCarDealerShipService,
  ) {}

  @ApiOperation({ deprecated: true })
  @SkipAuth()
  @Get()
  public async getArticles(@Query() query: ListUsersQueryDto): Promise<void> {}

  @ApiOperation({ deprecated: true })
  @SkipAuth()
  @Get(':articleId')
  public async getArticle(
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<ArticleSellerBaseResDto> {
    return ArticleMapper.toBaseResDto(
      await this.articlesCarDealerShipService.getArticle(articleId),
    );
  }

  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  @Post()
  public async createArticle(
    @CurrentUser() userData: IUserData,
    @Body() dto: BaseArticleReqDto,
  ): Promise<ArticleSellerBaseResDto> {
    return ArticleMapper.toBaseResDto(
      await this.articlesCarDealerShipService.createArticle(userData, dto),
    );
  }

  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  @Delete(':articleId')
  public async deleteArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.articlesCarDealerShipService.deleteArticle();
  }

  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  @Patch(':articleId')
  public async editArticle(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    // todo ArticleSellerResDto
    await this.articlesCarDealerShipService.editArticle();
  }
}
