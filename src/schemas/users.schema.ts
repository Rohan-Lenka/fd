import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { UserRole, UserRolesEnum } from 'src/apis/users/constants/user-role';

export type UsersDocument = HydratedDocument<Users>;

@Schema({
  timestamps: true,
})
export class Users {
  _id: Types.ObjectId;

  @Prop({ type: Number, enum: UserRolesEnum, default: UserRole.END_USER })
  role: UserRole;

  @Prop({ type: String, trim: true })
  firstName: string;

  @Prop({ type: String, trim: true })
  lastName?: string;

  @Prop({ type: String, enum: ['male', 'female', 'other'], required: false })
  gender?: 'male' | 'female' | 'other';

  @Prop({ type: String, trim: true })
  email: string;

  @Prop({ type: String, select: false })
  password?: string;

  @Prop({ type: String, trim: true, required: true })
  phone: string;

  @Prop({ type: Number, enum: [0, 1], default: 1 })
  status: number;

  @Prop({ type: Date, default: null })
  lastLoginAt?: Date;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;

  // Add other fields as needed
  // @Prop({ type: Types.ObjectId, ref: 'Organizations', default: null })
  // org?: Types.ObjectId;

  @Prop({ type: String, ref: 'Organizations', default: null })
  org?: string;

  @Prop({ type: String, trim: true })
  address?: string;

  @Prop({ type: String, trim: true })
  avatarUrl?: string;

  @Prop({ type: String, trim: true })
  refreshToken?: string;

  @Prop({ type: String, default: null })
  resetPasswordToken?: string;

  @Prop({ type: Date, default: null })
  resetPasswordExpires?: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
