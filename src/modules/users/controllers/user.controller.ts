import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../../../common/decorators/api-file.decorator';
import { UserID } from '../../../common/types/entity-ids.type';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserMapper } from '../mapper/user.mapper';
import { BannedReqUserDto } from '../models/req/banned-req-user.dto';
import { CreateUserReqUserDto } from '../models/req/create-user-req-user.dto';
import { ListSubscriptionsQueryDto } from '../models/req/list-subscriptions.query.dto';
import { ListUsersQueryDto } from '../models/req/list-users.query.dto';
import { UpdateReqUserDto } from '../models/req/update-req-user.dto';
import { SubscriptionsListResDto } from '../models/res/subscriptions-list.res.dto';
import { UserResDto } from '../models/res/user.res.dto';
import { UsersListResDto } from '../models/res/users-list.res.dto';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('getMe')
  public async getMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.getMe(userData));
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiFile('avatar', false, true)
  @Post('me/avatar')
  public async uploadAvatar(
    @CurrentUser() userData: IUserData,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.userService.uploadAvatar(userData, file);
  }

  @ApiBearerAuth()
  @Delete('me/avatar')
  public async deleteAvatar(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.deleteAvatar(userData);
  }

  @ApiBearerAuth()
  @Patch('editMe')
  public async editMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateReqUserDto,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.userService.editMe(userData, dto));
  }

  @ApiBearerAuth()
  @Delete('deleteMe')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.deleteMe(userData);
  }

  @ApiBearerAuth()
  @Get('getUsers')
  public async getUsers(
    @CurrentUser() userData: IUserData,
    @Query() query: ListUsersQueryDto,
  ): Promise<UsersListResDto> {
    const [entities, total] = await this.userService.getUsers(userData, query);
    return UserMapper.toResDtoList(entities, total, query);
  }

  @SkipAuth()
  @Get('getSellers')
  public async getSellers(
    @Query() query: ListUsersQueryDto,
  ): Promise<UsersListResDto> {
    const [entities, total] = await this.userService.getSellers(query);
    return UserMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @Post('subscribe')
  public async subscribe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.subscribe(userData);
  }

  @ApiBearerAuth()
  @Delete('subscribe')
  public async unsubscribe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.userService.unsubscribe(userData);
  }

  @ApiBearerAuth()
  @Post('createUser')
  public async createUser(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateUserReqUserDto,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(
      await this.userService.createUser(userData, dto),
    );
  }

  @ApiBearerAuth()
  @Get('getSubscriptions')
  public async getSubscriptions(
    @CurrentUser() userData: IUserData,
    @Query() query: ListSubscriptionsQueryDto,
  ): Promise<SubscriptionsListResDto> {
    const [entities, total] = await this.userService.getSubscriptions(
      query,
      userData,
    );
    return UserMapper.toSubscriptionResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @Patch(':userId/banned')
  public async banOrUnbanUser(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: UserID,
    @Body() dto: BannedReqUserDto,
  ): Promise<void> {
    await this.userService.banOrUnbanUser(userId, dto.isBanned, userData);
  }

  @ApiBearerAuth()
  @Get(':userId')
  public async getSeller(
    @CurrentUser() userData: IUserData,
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(
      await this.userService.getSeller(userId, userData),
    );
  }
}
