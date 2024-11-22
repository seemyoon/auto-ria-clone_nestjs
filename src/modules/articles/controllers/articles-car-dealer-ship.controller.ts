import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ArticlesCarDealerShipService } from '../services/articles-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('CarArticleDealerShip (in future)')
@Controller('article-car-dealership')
export class ArticlesCarDealerShipController {
  constructor(
    private readonly articlesCarDealerShipService: ArticlesCarDealerShipService,
  ) {}

  @ApiOperation({ deprecated: true })
  @Get()
  public async getCarArticles(): Promise<void> {
    await this.articlesCarDealerShipService.getCarArticles();
  }

  @ApiOperation({ deprecated: true })
  @Get(':carArticleId')
  public async getCarArticle(): Promise<void> {
    await this.articlesCarDealerShipService.getCarArticle();
  }

  @ApiOperation({ deprecated: true })
  @Post()
  public async createCarArticle(): Promise<void> {
    await this.articlesCarDealerShipService.createCarArticle();
  }

  @ApiOperation({ deprecated: true })
  @Delete(':carArticleId')
  public async deleteCarArticle(): Promise<void> {
    await this.articlesCarDealerShipService.deleteCarArticle();
  }

  @ApiOperation({ deprecated: true })
  @Patch(':carArticleId')
  public async editCarArticle(): Promise<void> {
    await this.articlesCarDealerShipService.editCarArticle();
  }
}
