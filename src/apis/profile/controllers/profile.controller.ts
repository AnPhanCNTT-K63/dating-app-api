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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({
    description: 'File upload endpoint',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
    @UploadedFile() file: IUploadedMulterFile,
  ) {
    return this.profileService.uploadAvatar(file, userPayload);
  }

  @Post('add-photo')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload endpoint',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * appSettings.maxFileSize.admin,
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
    @UploadedFile() file: IUploadedMulterFile,
  ) {
    return this.profileService.addPhoto(file, userPayload);
  }
}
