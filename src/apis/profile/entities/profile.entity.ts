import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  // Basic Info
  @Prop({ type: String, required: false })
  firstName: string;

  @Prop({ type: String, required: false })
  lastName: string;

  @Prop({ type: String, required: false })
  bio: string;

  // Personal Details
  @Prop({ type: Date, required: false })
  birthday: Date;

  @Prop({ type: String, enum: ['MAN', 'WOMAN', 'OTHER'], required: false })
  gender: string;

  @Prop({ type: String, enum: ['MAN', 'WOMAN', 'OTHER'], required: false })
  interestedIn: string;

  @Prop({ type: Number, min: 18, max: 100, required: false })
  age: number;

  @Prop({ type: String, required: false })
  jobTitle: string;

  @Prop({ type: String, required: false })
  company: string;

  @Prop({ type: String, required: false })
  education: string;

  // Location
  @Prop({ type: String, required: false })
  city: string;

  @Prop({ type: String, required: false })
  country: string;

  @Prop({ type: [Number], required: false })
  coordinates: number[]; // [longitude, latitude]

  // Preferences
  @Prop({ type: Number, min: 18, max: 100, required: false })
  minAgePreference: number;

  @Prop({ type: Number, min: 18, max: 100, required: false })
  maxAgePreference: number;

  @Prop({ type: Number, required: false })
  maxDistance: number; // in km

  // Appearance
  @Prop({ type: Number, min: 100, max: 250, required: false })
  height: number; // in cm

  @Prop({
    type: String,
    enum: ['slim', 'average', 'athletic', 'heavy'],
    required: false,
  })
  bodyType: string;

  // Lifestyle
  @Prop({
    type: String,
    enum: ['never', 'occasionally', 'often'],
    required: false,
  })
  smoking: string;

  @Prop({
    type: String,
    enum: ['never', 'occasionally', 'often'],
    required: false,
  })
  drinking: string;

  @Prop({ type: [String], required: false })
  hobbies: string[];

  // Verification
  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  // Settings
  @Prop({ type: Boolean, default: true })
  showAge: boolean;

  @Prop({ type: Boolean, default: true })
  showDistance: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Interest' }], required: false })
  interests: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'File', required: false })
  avatar: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'File' }], required: false })
  photos: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.plugin(autopopulateSoftDelete);

ProfileSchema.index({ coordinates: '2dsphere' });
