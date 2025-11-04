import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Products } from './products.schema';

export type RatingDocument = HydratedDocument<Rating>;

@Schema({
  timestamps: true,
})
export class Rating {
  @Prop({ type: SchemaTypes.ObjectId, ref: Users.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Products.name, required: true })
  productId: Types.ObjectId;

  @Prop({ type: Number, required: true })
  stars: number;

  @Prop({ trim: true })
  name?: string;

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

export const RatingSchema = SchemaFactory.createForClass(Rating);
