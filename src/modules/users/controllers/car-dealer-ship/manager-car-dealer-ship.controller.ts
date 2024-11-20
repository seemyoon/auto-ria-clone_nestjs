import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ManagerCarDealerShipService } from '../../services/car-dealer-ship/manager-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('Managers-CarDealership (in future)')
@Controller('manager-car-dealership')
export class ManagerCarDealerShipController {
  constructor(
    private readonly managerCarDealerShipController: ManagerCarDealerShipService,
  ) {}

  @ApiOperation({ deprecated: true })
  @Post('createManager')
  public async createManager(@Body() dto: any): Promise<void> {
    await this.managerCarDealerShipController.createManager(dto);
  }
}
