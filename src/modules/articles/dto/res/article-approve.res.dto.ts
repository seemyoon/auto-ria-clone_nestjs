import { ApiProperty } from '@nestjs/swagger';

export class ArticleApproveEditPendingResDto {
  @ApiProperty({
    example:
      'This article requires manager or admin approval for further changes.',
    description: 'Message indicating the status of the request',
  })
  message: string;
}
