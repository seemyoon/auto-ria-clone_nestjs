import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IsNull } from 'typeorm';

import { AuthCacheService } from '../../articles/services/auth-cache.service';
import { TokenService } from '../../articles/services/token.service';
import { UserRepository } from '../../repository/service/user.repository';
import { UserMapper } from '../../users/mapper/user.mapper';
import { SKIP_AUTH } from '../decorators/skip-auth.decorator';
import { TokenType } from '../models/enums/token-type.enum';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly refactor: Reflector,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.refactor.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyAuthTokens(
      accessToken,
      TokenType.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }
    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );
    if (!isAccessTokenExist) {
      throw new UnauthorizedException();
    }
    const user = await this.userRepository.findOneBy({
      id: payload.userId,
      deleted: IsNull(),
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.res.locals.user = UserMapper.toIUserData(user, payload);
    return true;
  }
}
