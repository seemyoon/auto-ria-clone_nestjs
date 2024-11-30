import { ApiProperty } from '@nestjs/swagger';

import {
  ArticleID,
  ReportAfter3ChangesID,
} from '../../../../common/types/entity-ids.type';

export class ChangesAfter3TimesReportsResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Report ID',
  })
  id: ReportAfter3ChangesID;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Created field',
  })
  createdAt: Date;

  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Report ID',
  })
  articleId: ArticleID;
}
