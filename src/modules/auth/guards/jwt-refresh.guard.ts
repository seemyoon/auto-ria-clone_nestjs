import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokenService } from '../../articles/services/token.service';
import { RefreshTokenRepository } from '../../repository/service/refresh-token.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UserMapper } from '../../users/mapper/user.mapper';
import { TokenType } from '../models/enums/token-type.enum';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyAuthTokens(
      refreshToken,
      TokenType.REFRESH,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    const isRefreshTokenExist =
      await this.refreshTokenRepository.isRefreshTokenExist(refreshToken);
    if (!isRefreshTokenExist) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findOneBy({ id: payload.userId });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.res.locals.user = UserMapper.toIUserData(user, payload);
    return true;
  }
}
