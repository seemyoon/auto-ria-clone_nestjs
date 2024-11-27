import { Injectable } from '@nestjs/common';

import { IUserData } from '../../../auth/interfaces/user-data.interface';
import { FileTypeEnum } from '../../../file-storage/enum/file-type.enum';
import { FileStorageService } from '../../../file-storage/services/file-storage.service';
import { UserRepository } from '../../../repository/service/user.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly userRepository: UserRepository,
  ) {}

  public async createAdmin(dto: any): Promise<void> {}

  public async editAdmin(userId: string, dto: any): Promise<void> {}

  public async getAdmin(userId: string): Promise<void> {}

  public async getSubscriptions(): Promise<void> {}

  public async uploadAvatarForAdmin(
    userData: IUserData,
    file: Express.Multer.File,
  ): Promise<void> {
    const admin = await this.userRepository.findOneBy({
      id: userData.userId,
    });
    const filePath = await this.fileStorageService.uploadFile(
      file,
      FileTypeEnum.IMAGE,
      userData.userId,
    );
    if (admin.image) {
      await this.fileStorageService.deleteFile(admin.image);
    }
    await this.userRepository.save({ ...admin, image: filePath });
  }
}
