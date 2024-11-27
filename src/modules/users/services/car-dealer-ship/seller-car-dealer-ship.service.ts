import { Injectable } from '@nestjs/common';

import { IUserData } from '../../../auth/interfaces/user-data.interface';
import { FileTypeEnum } from '../../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../../file-storage/services/file-storage.service';
import { UserRepository } from '../../../repository/service/user.repository';

@Injectable()
export class SellerCarDealerShipService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
  ) {}

  public async editSeller(userId: string, dto: any): Promise<void> {}

  public async getSeller(userId: string): Promise<void> {}

  public async uploadAvatarForCarDealerShipSeller(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    const sellerCarDealerShip = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      userData.userId,
    );
    if (sellerCarDealerShip.image) {
      await this.fileStorageService.deleteFile(sellerCarDealerShip.image);
    }
    await this.userRepository.save({ ...sellerCarDealerShip, image: filePath });
  }

  public async bannedSeller(userId: string, dto: any): Promise<void> {}

  public async subscribe(dto: any): Promise<void> {}

  public async unsubscribe(): Promise<void> {}
}
