import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthCacheService } from '../articles/services/auth-cache.service';
import { TokenService } from '../articles/services/token.service';
import { RedisModule } from '../redis/redis.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [RedisModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AuthCacheService, TokenService],
})
export class AuthModule {}
