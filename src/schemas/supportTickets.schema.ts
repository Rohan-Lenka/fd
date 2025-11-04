import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Orders } from './orders.schema';

export type SupportTicketsDocument = HydratedDocument<SupportTickets>;

@Schema({
  timestamps: true,
})
export class SupportTickets {
  @Prop({ type: String, trim: true })
  email?: string;

  @Prop({ type: String, trim: true, default: '' })
  attachment?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Orders.name, default: null })
  orderId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Users.name, default: null })
  userId: Types.ObjectId;

  @Prop({ type: String, trim: true })
  reason?: string;

  @Prop({ type: String, trim: true })
  description?: string;

  @Prop({
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open',
  })
  status: string;

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

export const SupportTicketsSchema =
  SchemaFactory.createForClass(SupportTickets);
