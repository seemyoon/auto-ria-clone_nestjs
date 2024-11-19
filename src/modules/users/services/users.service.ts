import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public async createManager(): Promise<void> {}

  public async getSeller(): Promise<void> {}

  public async bannedSeller(): Promise<void> {}
}
