import { Controller, Post } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  public async signIn() {
    await this.authService.signIn();
  }

  @Post('sign-up')
  public async signUp() {
    await this.authService.signUp();
  }
}
