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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../../../common/types/entity-ids.type';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';
import { SkipAuth } from '../../../auth/decorators/skip-auth.decorator';
import { IUserData } from '../../../auth/interfaces/user-data.interface';
import { UserMapper } from '../../mapper/user.mapper';
import { BannedReqUserDto } from '../../models/req/banned-req-user.dto';
import { ListUsersQueryDto } from '../../models/req/list-users.query.dto';
import { UpdateReqUserDto } from '../../models/req/update-req-user.dto';
import { UserResDto } from '../../models/res/user.res.dto';
import { UsersListResDto } from '../../models/res/users-list.res.dto';
import { SellerService } from '../../services/users-of-the-entire-platform/seller.service';

@ApiTags('Sellers')
@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @ApiBearerAuth()
  @Get('getMe')
  public async getMe(@CurrentUser() userData: IUserData): Promise<UserResDto> {
    return UserMapper.toResDto(await this.sellerService.getMe(userData));
  }

  @ApiBearerAuth()
  @Patch('editMe')
  public async editMe(
    @CurrentUser() userData: IUserData,
    @Body() dto: UpdateReqUserDto,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(await this.sellerService.editMe(userData, dto));
  }

  @ApiBearerAuth()
  @Get('deleteMe')
  public async deleteMe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.sellerService.deleteMe(userData);
  }

  @SkipAuth()
  @Get('all-sellers')
  public async getSellers(
    @Query() query: ListUsersQueryDto,
  ): Promise<UsersListResDto> {
    const [entities, total] = await this.sellerService.getSellers(query);
    return UserMapper.toResDtoList(entities, total, query);
  }

  @Post('subscribe')
  public async subscribe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.sellerService.subscribe(userData);
  }

  @Delete('subscribe')
  public async unsubscribe(@CurrentUser() userData: IUserData): Promise<void> {
    await this.sellerService.unsubscribe(userData);
  }

  @ApiBearerAuth()
  @Patch('editSeller')
  public async editSeller(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) userId: UserID,
    @Body() dto: UpdateReqUserDto,
  ): Promise<UserResDto> {
    return UserMapper.toResDto(
      await this.sellerService.editSeller(userData, userId, dto),
    );
  }

  @Patch(':sellerId/banned')
  public async banOrUnbanUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: BannedReqUserDto,
  ): Promise<void> {
    await this.sellerService.banOrUnbanUser(userId, dto.isBanned);
  }

  @Get(':sellerId')
  public async getSeller(
    @Param('id', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.sellerService.getSeller(userId);
  }
}
