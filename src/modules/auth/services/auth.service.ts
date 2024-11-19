import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async signIn(): Promise<void> {}

  public async signUp(): Promise<void> {
    // permission admin to create manager
  }

  public async logOut(): Promise<void> {}

  public async refreshToken(): Promise<void> {}
}
