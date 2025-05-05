import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from 'src/pipes/parse-object-id.pipe';
import { Me } from 'src/decorators/me.decorator';
import { UserPayload } from 'src/base/models/user-payload.model';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { ProfileService } from 'src/apis/profile/profile.service';
import { CreateProfileDto } from 'src/apis/profile/dto/create-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { appSettings } from 'src/configs/app-settings';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAll();
  }

  @Get('me')
  async getMe(@Me() userPayload: UserPayload) {
    return await this.usersService.getOne({
      _id: new Types.ObjectId(userPayload._id),
    });
  }

  @Get(':id')
  async getUserById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.usersService.getOne({ _id: new Types.ObjectId(id) });
  }

  @Patch('update-account')
  async updateAccount(
    @Me() userPayload: UserPayload,
    @Body() dto: UpdateAccountDto,
  ) {
    return this.usersService.updateAccount(userPayload, dto);
  }

  @Patch('/update-profile')
  updateProfile(
    @Me() userPayload: UserPayload,
    @Body() profileDto: CreateProfileDto,
  ) {
    return this.profileService.updateProfile(userPayload, profileDto);
  }
}
