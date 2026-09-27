import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '@/lib/types';

export type IUserSchema = Omit<IUser, '_id'>;

const UserSchema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      required: [true, 'Ad soyad alanı zorunludur'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'E-posta adresi zorunludur'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: false,
      select: true,
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    provider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials',
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserSchema> =
  mongoose.models.User || mongoose.model<IUserSchema>('User', UserSchema);

export default User;
