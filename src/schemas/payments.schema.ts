import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from './users.schema';
import { Orders } from './orders.schema';

export type PaymentsDocument = HydratedDocument<Payments>;

@Schema({
  timestamps: true,
})
export class Payments {
  @Prop({ type: Types.ObjectId, ref: Orders.name, required: true })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Users.name, required: true })
  userId: Types.ObjectId;

  @Prop({ trim: true })
  method?: string;

  @Prop({ trim: true, default: 'pending' })
  status?: string;

  @Prop({ type: Number, required: true })
  amount: number;

  @Prop({ trim: true })
  transactionId?: string;

  @Prop({ trim: true })
  name?: string;

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

export const PaymentsSchema = SchemaFactory.createForClass(Payments);
