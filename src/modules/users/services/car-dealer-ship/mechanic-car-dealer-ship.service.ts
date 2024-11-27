import { Injectable } from '@nestjs/common';

import { IUserData } from '../../../auth/interfaces/user-data.interface';
import { FileTypeEnum } from '../../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../../file-storage/services/file-storage.service';
import { UserRepository } from '../../../repository/service/user.repository';

@Injectable()
export class MechanicCarDealerShipService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
  ) {}

  public async uploadAvatarForCarDealerShipMechanic(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    const mechanicCarDealerShip = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      userData.userId,
    );
    if (mechanicCarDealerShip.image) {
      await this.fileStorageService.deleteFile(mechanicCarDealerShip.image);
    }
    await this.userRepository.save({
      ...mechanicCarDealerShip,
      image: filePath,
    });
  }

  public async createMechanic(dto: any): Promise<void> {}
}
