import { Injectable } from '@nestjs/common';

@Injectable()
export class SellerCarDealerShipService {
  public async editSeller(userId: string, dto: any): Promise<void> {
    //seller_type DealerShipSeller or UsualSeller
  }

  public async getSeller(userId: string): Promise<void> {
    //seller_type DealerShipSeller or UsualSeller
  }

  public async bannedSeller(userId: string, dto: any): Promise<void> {
    //seller_type DealerShipSeller or UsualSeller
  }

  public async subscribe(dto: any): Promise<void> {
    //seller_type DealerShipSeller or UsualSeller
  }

  public async unsubscribe(): Promise<void> {
    //seller_type DealerShipSeller or UsualSeller
  }
}
