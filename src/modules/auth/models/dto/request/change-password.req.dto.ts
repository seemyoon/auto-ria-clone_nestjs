import { ApiProperty } from '@nestjs/swagger';
import { IsNotIn, IsString, Length, Matches } from 'class-validator';

export class ChangePasswordReqDto {
  @ApiProperty({ example: '123qweQWE' })
  @IsNotIn(['password', '123456789', 'qwerty'])
  @IsString()
  @Length(0, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  oldPassword: string;

  @ApiProperty({ example: '123asdASD' })
  @IsNotIn(['password', '123456789', 'qwerty'])
  @IsString()
  @Length(0, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  password: string;
}
