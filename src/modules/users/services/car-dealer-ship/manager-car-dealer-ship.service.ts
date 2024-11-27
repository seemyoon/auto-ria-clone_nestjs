import { Injectable } from '@nestjs/common';

import { IUserData } from '../../../auth/interfaces/user-data.interface';
import { FileTypeEnum } from '../../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../../file-storage/services/file-storage.service';
import { UserRepository } from '../../../repository/service/user.repository';

@Injectable()
export class ManagerCarDealerShipService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
  ) {}

  public async createManager(dto: any): Promise<void> {}

  public async uploadAvatarForCarDealerShipManager(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    const managerCarDealerShip = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      userData.userId,
    );
    if (managerCarDealerShip.image) {
      await this.fileStorageService.deleteFile(managerCarDealerShip.image);
    }
    await this.userRepository.save({
      ...managerCarDealerShip,
      image: filePath,
    });
  }
}
