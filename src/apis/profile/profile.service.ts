import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './entities/profile.entity';
import { Model, Types } from 'mongoose';
import { UserPayload } from 'src/base/models/user-payload.model';
import { IUploadedMulterFile } from 'src/packages/s3/s3.service';
import { MediaService } from '../media/media.service';
import { CreateProfileDto } from './dto/create-profile.dto';
<<<<<<< HEAD

=======
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
    private readonly mediaService: MediaService,
  ) {}

<<<<<<< HEAD
  async createEmptyProfile(userId: Types.ObjectId) {
    return this.profileModel.create({ user: userId });
  }

  async getProfile(userId: Types.ObjectId) {
    return this.profileModel
      .findOne({ user: userId })
      .populate('avatar photos');
  }

  async updateProfile(
=======
  async updateOne(
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
    userPayload: UserPayload,
    profileDto: Partial<CreateProfileDto>,
  ) {
    try {
<<<<<<< HEAD
      // Calculate age if birthday is provided
      if (profileDto.birthday) {
        const age = this.calculateAge(new Date(profileDto.birthday));
        profileDto['age'] = age;
      }

      const updatedProfile = await this.profileModel
        .findOneAndUpdate(
          { user: new Types.ObjectId(userPayload._id) },
          { $set: profileDto },
          { new: true },
        )
        .populate('avatar photos');

      if (!updatedProfile) throw new BadRequestException('Profile not found');

=======
      const updatedProfile = await this.profileModel.findOneAndUpdate(
        { user: new Types.ObjectId(userPayload._id) },
        { $set: profileDto },
        { new: true },
      );
      if (!updatedProfile) throw new BadRequestException('Profile not found');

      updatedProfile.save();

>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
      return updatedProfile;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async uploadAvatar(avatar: IUploadedMulterFile, user: UserPayload) {
    try {
<<<<<<< HEAD
      if (!avatar) throw new BadRequestException('Avatar file is required');
=======
      if (!avatar) return new BadRequestException('Avatar null');
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82

      const newAvatarFile = await this.mediaService.createFile(
        avatar,
        user,
        'avatars',
      );

      if (newAvatarFile instanceof BadRequestException) throw newAvatarFile;

<<<<<<< HEAD
      const updatedProfile = await this.profileModel
        .findOneAndUpdate(
          { user: new Types.ObjectId(user._id) },
          { $set: { avatar: newAvatarFile._id } },
          { new: true },
        )
        .populate('avatar');

      if (!updatedProfile) {
        throw new BadRequestException('Profile not found');
      }

      return updatedProfile;
=======
      const existingProfile = await this.profileModel.findOne({
        user: new Types.ObjectId(user._id),
      });

      newAvatarFile.createdBy = user._id;

      await newAvatarFile.save();

      if (!existingProfile) {
        throw new BadRequestException('Profile not found');
      }

      existingProfile.avatar = newAvatarFile._id;

      await existingProfile.save();
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
<<<<<<< HEAD

  async addPhoto(photo: IUploadedMulterFile, user: UserPayload) {
    try {
      if (!photo) throw new BadRequestException('Photo file is required');

      const newPhoto = await this.mediaService.createFile(
        photo,
        user,
        'profile-photos',
      );

      if (newPhoto instanceof BadRequestException) throw newPhoto;

      const updatedProfile = await this.profileModel
        .findOneAndUpdate(
          { user: new Types.ObjectId(user._id) },
          { $push: { photos: newPhoto._id } },
          { new: true },
        )
        .populate('photos');

      if (!updatedProfile) {
        throw new BadRequestException('Profile not found');
      }

      return updatedProfile;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private calculateAge(birthday: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthday.getDate())
    ) {
      age--;
    }

    return age;
  }
=======
>>>>>>> b0aaa98696d35ce6a80ebb23c0c4806a1c24af82
}
