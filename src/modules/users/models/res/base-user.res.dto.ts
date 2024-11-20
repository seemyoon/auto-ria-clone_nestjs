import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResDto {
  @ApiProperty({ type: String })
  id: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  isPremium?: boolean;
  role: string;
  deleted?: Date;
  isBanned?: boolean;
  created: Date;
  updated: Date;
}
