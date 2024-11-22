import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticlesCarDealerShipService {
  public async getCarArticles(): Promise<void> {}

  public async getCarArticle(): Promise<void> {}

  public async createCarArticle(): Promise<void> {}

  public async deleteCarArticle(): Promise<void> {}

  public async editCarArticle(): Promise<void> {}

  private async verifyArticle(): Promise<void> {}
}

// export class Approve3TimesOfCarResDto {
//   @ApiProperty({
//     example:
//       'You have edited the ad 3 times. It is now being reviewed. Please wait for confirmation.',
//     description: 'Message indicating attempts',
//   })
//   message: string;
// }
//
// export class ApproveBrandOfCarResDto {
//   @ApiProperty({
//     example:
//       'Sorry, but no car was found for your request. The request has been sent to the manager, please wait' +
//       ' until he approves it.',
//     description: 'Message indicating the status of the request',
//   })
//   message: string;
// }
//
// export class ApproveRegionOfCarResDto {
//   @ApiProperty({
//     example:
//       'Sorry, no car was found in the specified region. The request has been sent to the manager for approval.' +
//       ' Please  wait for confirmation.',
//     description:
//       'Message indicating the status of the request related to car region approval',
//   })
//   message: string;
// }
