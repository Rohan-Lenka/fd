import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from './users.schema';
import EnsureObjectId from '@nest-extended/core/common/ensureObjectId';

export type FaqDocument = HydratedDocument<Faq>;

@Schema({
  timestamps: true,
})
export class Faq {
  @Prop({ trim: true })
  question?: string;

  @Prop({ trim: true })
  answer?: string;

  @Prop({ trim: true })
  type?: string;

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
    type: Types.ObjectId,
    ref: Users.name,
    default: null,
  })
  deletedBy?: Types.ObjectId;

  @Prop({
    type: Boolean,
    default: null,
  })
  deleted?: Boolean;

  @Prop({
    type: Date,
    default: null,
  })
  deletedAt?: Date;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);
