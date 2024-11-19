import { Controller, Delete, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  public async signIn(): Promise<void> {
    await this.authService.signIn();
  }

  @Post('sign-up')
  public async signUp(): Promise<void> {
    await this.authService.signUp();
  }

  @Delete('log-out')
  public async logOut(): Promise<void> {
    await this.authService.logOut();
  }

  @Post('refreshToken')
  public async refreshToken(): Promise<void> {
    await this.authService.refreshToken();
  }
}
