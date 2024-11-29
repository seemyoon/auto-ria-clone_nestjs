import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { PasswordService } from '../auth/services/password.service';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { UserController } from './controllers/user.controller';
import { UserCarDealerShipController } from './controllers/user-car-dealer-ship.controller';
import { UserService } from './services/user.service';
import { UserCarDealerShipService } from './services/user-car-dealer-ship.service';

@Module({
  imports: [AuthModule, FileStorageModule],
  controllers: [UserController, UserCarDealerShipController],
  providers: [UserService, UserCarDealerShipService, PasswordService],
})
export class UsersModule {}
