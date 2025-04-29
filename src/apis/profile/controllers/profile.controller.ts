<<<<<<< HEAD
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from '../profile.service';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { appSettings } from 'src/configs/app-settings';
import { Types } from 'mongoose';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  async getMyProfile(@Me() userPayload: UserPayload) {
    return this.profileService.getProfile(new Types.ObjectId(userPayload._id));
  }

  @Post('update')
  async updateProfile(
    @Me() userPayload: UserPayload,
    @Body() profileDto: CreateProfileDto,
  ) {
    return this.profileService.updateProfile(userPayload, profileDto);
  }

  @Post('upload-avatar')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * appSettings.maxFileSize.front,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadAvatar(
    @Me() userPayload: UserPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const multerFile: IUploadedMulterFile = {
      fieldName: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      buffer: file.buffer,
      size: file.size,
    };
    return this.profileService.uploadAvatar(multerFile, userPayload);
  }

  @Post('add-photo')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * appSettings.maxFileSize.front,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async addPhoto(
    @Me() userPayload: UserPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const multerFile: IUploadedMulterFile = {
      fieldName: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      buffer: file.buffer,
      size: file.size,
    };
    return this.profileService.addPhoto(multerFile, userPayload);
  }
=======
import { Controller } from '@nestjs/common';
import { ProfileService } from '../profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
}
