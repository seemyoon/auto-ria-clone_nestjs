import { ApiProperty } from '@nestjs/swagger';

export class ApproveRegionOfCarResDto {
  @ApiProperty({
    example:
      'Sorry, no car was found in the specified region. The request has been sent to the manager for approval.' +
      ' Please  wait for confirmation.',
    description:
      'Message indicating the status of the request related to car region approval',
  })
  message: string;
}
