import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  public async getCarArticles(): Promise<void> {}

  public async getCarArticle(): Promise<void> {}

  public async createCarArticle(): Promise<void> {}

  public async deleteCarArticle(): Promise<void> {}

  public async editCarArticle(): Promise<void> {}

  public async favouriteCarArticle(): Promise<void> {}

  private async verifyArticle(): Promise<void> {}
}
