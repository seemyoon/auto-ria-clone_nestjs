import { PickType } from '@nestjs/swagger';

import { CarReqDto } from './car.req.dto';

export class UpdateCarReqDto extends PickType(CarReqDto, ['brand', 'model']) {}
