import { ApiProperty } from '@nestjs/swagger';

import { ReportID } from '../../../../common/types/entity-ids.type';
import { ReportEnum } from '../../enum/report.enum';

export class ReportResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Report ID',
  })
  id: ReportID;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Created field',
  })
  createdAt: Date;

  @ApiProperty({
    enum: ReportEnum,
    example: ReportEnum.APPROVE_ADD_BRAND_OR_MODEL_AUTO,
  })
  type: ReportEnum;
}
