import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../decorators/current-user.decorator';
import { SkipAuth } from '../decorators/skip-auth.decorator';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { IUserData } from '../interfaces/user-data.interface';
import { ChangePasswordReqDto } from '../models/dto/request/change-password.req.dto';
import { ChangeTemporaryPasswordReqDto } from '../models/dto/request/change-temporary-password.req.dto';
import { SignInReqDto } from '../models/dto/request/sign-in.req.dto';
import { SignUpReqDto } from '../models/dto/request/sign-up.req.dto';
import { AuthResDto } from '../models/dto/response/auth.res.dto';
import { TokenPairResDto } from '../models/dto/response/token-pair.res.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('sing-in')
  public async singIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @SkipAuth()
  @Post('sing-up')
  public async singUp(@Body() dto: SignUpReqDto): Promise<AuthResDto> {
    return await this.authService.signUp(dto);
  }

  @ApiBearerAuth()
  @Post('log-out')
  public async logOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.logOut(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refreshToken(userData);
  }

  // @SkipAuth()
  // @ApiBearerAuth()
  // @Post('forgotPassword')
  // public async forgotPasswordSendEmail(
  //   @CurrentUser() userData: IUserData,
  //   @Body() dto: ForgotPasswordReqDto,
  // ): Promise<void> {
  //   await this.authService.forgotPasswordSendEmail(userData, dto);
  // } //todo forgot password

  @ApiBearerAuth()
  @Post('changePassword')
  public async changePassword(
    @CurrentUser() userData: IUserData,
    @Body() dto: ChangePasswordReqDto,
  ): Promise<void> {
    await this.authService.changePassword(userData, dto);
  }

  @Post('changeTemporaryPassword')
  public async changeTemporaryPassword(
    @Body() dto: ChangeTemporaryPasswordReqDto,
  ): Promise<void> {
    await this.authService.changeTemporaryPassword(dto);
  }
}
