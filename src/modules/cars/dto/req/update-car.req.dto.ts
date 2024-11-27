import { OmitType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { CarReqDto } from './car.req.dto';

export class UpdateCarReqDto extends OmitType(CarReqDto, []) {
  @IsOptional()
  @Type(() => String)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  brand?: string;

  @IsOptional()
  @Type(() => String)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  model?: string;
}
