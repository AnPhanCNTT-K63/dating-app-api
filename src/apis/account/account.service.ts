import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getAccountInfo(userId: Types.ObjectId) {
    return this.userModel
      .findById(userId)
      .select('email username createdAt updatedAt') // Chỉ lấy các trường account
      .exec();
  }

  async updateAccount(userId: Types.ObjectId, updateDto: UpdateAccountDto) {
    return this.userModel
      .findByIdAndUpdate(userId, { $set: updateDto }, { new: true })
      .select('-password -__v'); // Loại bỏ password và version key
  }

  async changePassword(
    userId: Types.ObjectId,
    changePasswordDto: ChangePasswordDto,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await user.save();

    return { message: 'Password changed successfully' };
  }
}
