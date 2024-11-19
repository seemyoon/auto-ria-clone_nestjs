import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public async signIn(): Promise<void> {}

  public async signUp(): Promise<void> {
    // permission admin to create manager
  }
}
