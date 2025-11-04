import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from './users.schema';
import { Darkstores } from './darkstores.schema';

export type DeliverypartnersDocument = HydratedDocument<Deliverypartners>;

@Schema({
  timestamps: true,
})
export class Deliverypartners {
  @Prop({ type: String, ref: Darkstores.name })
  darkStoreId?: string;

  @Prop({ trim: true })
  name?: string;

  @Prop({ trim: true })
  mobile?: string;

  @Prop({ trim: true })
  vehicleType?: string;

  @Prop({ type: String, default: 'active' })
  status?: string;

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

export const DeliverypartnersSchema =
  SchemaFactory.createForClass(Deliverypartners);
