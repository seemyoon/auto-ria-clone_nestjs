import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  public async createAdmin(dto: any): Promise<void> {}

  public async editAdmin(userId: string, dto: any): Promise<void> {}

  public async getAdmin(userId: string): Promise<void> {}
}