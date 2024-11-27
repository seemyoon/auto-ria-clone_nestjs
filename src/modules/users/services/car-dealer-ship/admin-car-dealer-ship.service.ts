import { Injectable } from '@nestjs/common';

import { IUserData } from '../../../auth/interfaces/user-data.interface';
import { FileTypeEnum } from '../../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../../file-storage/services/file-storage.service';
import { UserRepository } from '../../../repository/service/user.repository';

@Injectable()
export class AdminCarDealerShipService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
  ) {}

  public async uploadAvatarForCarDealerShipAdmin(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    const adminCarDealerShip = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      userData.userId,
    );
    if (adminCarDealerShip.image) {
      await this.fileStorageService.deleteFile(adminCarDealerShip.image);
    }
    await this.userRepository.save({
      ...adminCarDealerShip,
      image: filePath,
    });
  }

  public async createAdmin(dto: any): Promise<void> {}

  public async editAdmin(userId: string, dto: any): Promise<void> {}

  public async getAdmin(userId: string): Promise<void> {}
}
