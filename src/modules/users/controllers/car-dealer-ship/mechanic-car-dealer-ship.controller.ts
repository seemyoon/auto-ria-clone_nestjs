import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { MechanicCarDealerShipService } from '../../services/car-dealer-ship/mechanic-car-dealer-ship.service';

@ApiBearerAuth()
@ApiTags('Mechanic-CarDealership (in future)')
@Controller('mechanic-car-dealership')
export class MechanicCarDealerShipController {
  constructor(
    private readonly mechanicCarDealerShipController: MechanicCarDealerShipService,
  ) {}

  @ApiOperation({ deprecated: true })
  @Post('createMechanic')
  public async createMechanic(@Body() dto: any): Promise<void> {
    await this.mechanicCarDealerShipController.createMechanic(dto);
  }
}
