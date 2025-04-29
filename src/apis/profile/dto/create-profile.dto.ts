import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
<<<<<<< HEAD
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
=======
import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    type: String,
    required: false,
  })
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
  @IsOptional()
  @IsString()
  firstName: string;

<<<<<<< HEAD
  @ApiProperty({ required: false })
=======
  @ApiProperty({
    type: String,
    required: false,
  })
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
  @IsOptional()
  @IsString()
  lastName: string;

<<<<<<< HEAD
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  bio: string;

  // Personal Details
  @ApiProperty({ required: false })
=======
  @ApiProperty({
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    type: Date,
    required: false,
  })
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday: Date;
<<<<<<< HEAD

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
=======
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
}
