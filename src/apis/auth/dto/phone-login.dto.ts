import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PhoneLoginDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
