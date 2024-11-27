import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CarReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @ApiProperty({
    example: 'Toyota',
    description: 'Brand of the car',
  })
  brand: string;

  @Type(() => String)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @ApiProperty({
    example: 'Corolla',
    description: 'Model of the car',
  })
  model: string;
}
