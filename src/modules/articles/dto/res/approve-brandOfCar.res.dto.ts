import { ApiProperty } from '@nestjs/swagger';

export class ApproveBrandOfCarResDto {
  @ApiProperty({
    example:
      'Sorry, but no car was found for your request. The request has been sent to the manager, please wait' +
      ' until he approves it.',
    description: 'Message indicating the status of the request',
  })
  message: string;
}
