import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from './users.schema';
import EnsureObjectId from '@nest-extended/core/common/ensureObjectId';

export type DarkstoresDocument = HydratedDocument<Darkstores>;

@Schema({
  timestamps: true,
})
export class Darkstores {
  @Prop({ trim: true })
  name?: string;

  @Prop({ trim: true })
  address?: string;

  @Prop({
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  geoLocation: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };

  @Prop({ type: Number, default: null })
  servingRadiusKm?: number;

  @Prop({ type: Boolean, default: true })
  isServiceable?: boolean;

  @Prop({ trim: true, default: 'Asia/Kolkata' })
  timezone?: string;

  @Prop({ trim: true, default: 'active' })
  status?: string;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    default: null,
  })
  createdBy: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    default: null,
  })
  updatedBy?: Types.ObjectId;

  @Prop({
    type: Boolean,
    default: false,
  })
  deleted?: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    default: null,
  })
  deletedBy?: Types.ObjectId;

  @Prop({
    type: Date,
    default: null,
  })
  deletedAt?: Date;
}

export const DarkstoresSchema = SchemaFactory.createForClass(Darkstores);

DarkstoresSchema.index({ geoLocation: '2dsphere' });
