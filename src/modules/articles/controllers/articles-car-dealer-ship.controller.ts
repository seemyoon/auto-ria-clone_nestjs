import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { BaseArticleReqDto } from '../dto/req/article.req.dto';
import { ArticleSellerBaseResDto } from '../dto/res/article-seller-base-res.dto';
import { ArticleMapper } from '../mapper/article.mapper';
import { ArticlesCarDealerShipService } from '../services/articles-car-dealer-ship.service';

@ApiTags('ArticleDealerShip (in future)')
@Controller('article-car-dealership')
export class ArticlesCarDealerShipController {
  constructor(
    private readonly articlesCarDealerShipService: ArticlesCarDealerShipService,
  ) {}

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
