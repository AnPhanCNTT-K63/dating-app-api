import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProfileDto {
  // Basic Info
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio: string;

  // Personal Details
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty({ enum: ['male', 'female', 'other'], required: false })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @ApiProperty({ enum: ['male', 'female', 'both'], required: false })
  @IsOptional()
  @IsEnum(['male', 'female', 'both'])
  interestedIn: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  jobTitle: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  company: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  education: string;

  // Location
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  country: string;

  // Preferences
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minAgePreference: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxAgePreference: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  maxDistance: number;

  // Appearance
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  height: number;

  @ApiProperty({
    enum: ['slim', 'average', 'athletic', 'heavy'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['slim', 'average', 'athletic', 'heavy'])
  bodyType: string;

  // Lifestyle
  @ApiProperty({ enum: ['never', 'occasionally', 'often'], required: false })
  @IsOptional()
  @IsEnum(['never', 'occasionally', 'often'])
  smoking: string;

  @ApiProperty({ enum: ['never', 'occasionally', 'often'], required: false })
  @IsOptional()
  @IsEnum(['never', 'occasionally', 'often'])
  drinking: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  hobbies: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  interests: string[];

  // Settings
  @ApiProperty({ required: false, default: true })
  @IsOptional()
  showAge: boolean;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  showDistance: boolean;
}
