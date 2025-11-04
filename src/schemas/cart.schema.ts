import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Darkstores } from './darkstores.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({
  timestamps: true,
})
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: Users.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Darkstores.name, required: true })
  darkStoreId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  subtotal?: number;

  @Prop({ type: Number, default: 0 })
  mrptotal?: number;

  @Prop({ type: Number, default: 0 })
  tax?: number;

  @Prop({ type: Number, default: 0 })
  deliveryFee?: number;

  @Prop({ type: Number, default: 0 })
  totalItems?: number;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  createdBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  updatedBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  deletedBy?: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  deleted?: Boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
