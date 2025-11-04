import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Darkstores } from './darkstores.schema';
import { Useraddresses } from './useraddresses.schema';
import { Cart } from './cart.schema';

export type OrdersDocument = HydratedDocument<Orders>;

@Schema({
  timestamps: true,
})
export class Orders {
  @Prop({ type: SchemaTypes.ObjectId, ref: Users.name, required: true })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Darkstores.name, required: true })
  darkStoreId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Useraddresses.name, default: null })
  addressId?: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Cart.name, default: null })
  cartId?: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  canceled?: boolean;

  @Prop({ type: Date, default: null })
  canceledAt?: Date;

  @Prop({
    trim: true,
    enum: ['not_initiated', 'processing', 'completed', 'failed'],
    default: 'not_initiated',
  })
  refundStatus?: string;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  canceledBy?: Types.ObjectId;

  @Prop({ trim: true, unique: true, required: true })
  orderUniqueId: string;

  @Prop({ type: Number, required: true })
  orderAmount: number;

  @Prop({ type: Number, default: 0 })
  paymentAmount?: number;

  @Prop({ type: Number, default: 0 })
  refundAmount?: number;

  @Prop({
    trim: true,
    enum: ['pending', 'completed', 'failure'],
    default: 'pending',
  })
  paymentStatus: string;

  @Prop({
    trim: true,
    enum: ['online', 'cod', 'wallet', 'upi'],
    default: 'online',
  })
  paymentMode?: string;

  @Prop({ type: Boolean, default: false })
  isStatusPaid?: boolean;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  updatedBy?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name, default: null })
  deletedBy?: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  deleted?: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ type: String, default: 'pending' })
  status?: string;

  @Prop({ type: Types.ObjectId, default: null })
  deliveryPartnerId?: Types.ObjectId;

  @Prop({ type: Number, default: null })
  etaMinutes?: number;

  @Prop({ type: Date, default: null })
  placedAt?: Date;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
