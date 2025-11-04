import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';

export type UseraddressesDocument = HydratedDocument<Useraddresses>;

@Schema({
  timestamps: true,
})
export class Useraddresses {
  @Prop({ type: SchemaTypes.ObjectId, ref: Users.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, trim: true })
  address?: string;

  @Prop({ type: String, trim: true })
  city?: string;

  @Prop({ type: String, trim: true })
  state?: string;

  @Prop({ type: String, trim: true })
  pincode?: string;

  @Prop({
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    default: null,
  })
  geoLocation?: {
    lat: number;
    lng: number;
  };

  @Prop({ type: Boolean, default: false })
  isDefault?: boolean;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  updatedBy?: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  deleted?: boolean;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  deletedBy?: Types.ObjectId;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const UseraddressesSchema = SchemaFactory.createForClass(Useraddresses);
