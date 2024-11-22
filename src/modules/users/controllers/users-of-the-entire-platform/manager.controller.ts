import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ManagerService } from '../../services/users-of-the-entire-platform/manager.service';

@ApiBearerAuth()
@ApiTags('Managers')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('createManager')
  public async createManager(@Body() dto: any): Promise<void> {
    await this.managerService.createManager(dto);
  }

  @Patch('editMe')
  public async editManager(@Body() dto: any): Promise<void> {
    await this.managerService.createManager(dto);
  }
}
