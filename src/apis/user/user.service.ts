import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from '../profile/entities/profile.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UserPayload } from 'src/base/models/user-payload.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
  ) {}

  // Lấy tất cả user
  async getAll(filter: FilterQuery<User> = {}) {
    return await this.userModel
      .find(filter)
      .populate(this.getPopulateOptions())
      .exec();
  }

  // Lấy 1 user theo filter
  async getOne(filter: FilterQuery<User>) {
    try {
      return await this.userModel
        .findOne(filter)
        .populate(this.getPopulateOptions());
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // Tạo user mới
  async creatOne(userDto: CreateUserDto) {
    try {
      const newUser = await this.userModel.create(userDto);

      // Tạo profile rỗng cho user
      const profile = new Profile();
      profile.user = newUser._id;
      const newProfile = await this.profileModel.create(profile);
      newUser.profile = newProfile._id;
      await newProfile.save();
      await newUser.save();

      return { message: 'Create success' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // Cập nhật tài khoản (bao gồm cả mật khẩu)
  async updateAccount(
    userPayload: UserPayload,
    updateDto: Partial<UpdateAccountDto>,
  ) {
    try {
      if (updateDto.password) {
        updateDto.password = await bcrypt.hash(updateDto.password, 10);
      }

      const existingUser = await this.userModel.findByIdAndUpdate(
        new Types.ObjectId(userPayload._id),
        { $set: updateDto },
        { new: true },
      );

      return existingUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // Xử lý upload avatar
  async uploadAvatar(userPayload: UserPayload, filePath: string) {
    try {
      if (!filePath) {
        throw new BadRequestException('Không có file được tải lên!');
      }

      // Lấy profile của user hiện tại
      const user = await this.userModel.findById(userPayload._id);
      if (!user) {
        throw new BadRequestException('User không tồn tại!');
      }

      // Cập nhật đường dẫn avatar
      const updatedProfile = await this.profileModel.findByIdAndUpdate(
        user.profile,
        { $set: { avatar: filePath } }, // Lưu đường dẫn file
        { new: true },
      );

      return {
        message: 'Cập nhật avatar thành công!',
        avatar: updatedProfile?.avatar,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // Tùy chọn populate cho MongoDB
  private getPopulateOptions() {
    return {
      path: 'profile',
      populate: ['avatar'],
    };
  }
}
