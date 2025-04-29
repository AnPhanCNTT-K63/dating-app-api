import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLogin {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  token: string;
}
