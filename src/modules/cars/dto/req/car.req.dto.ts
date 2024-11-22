import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseCarReqDto {
  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @IsString()
  @ApiProperty({
    example: 'Toyota',
    description: 'Brand of the car',
  })
  brand: string;

  @Type(() => String)
  @Transform(TransformHelper.toTrim)
  @ApiProperty({
    example: 'Corolla',
    description: 'Model of the car',
  })
  model: string;
}
