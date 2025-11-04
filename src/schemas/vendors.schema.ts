import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Darkstores } from './darkstores.schema';

export type VendorsDocument = HydratedDocument<Vendors>;

@Schema({
  timestamps: true,
})
export class Vendors {
  @Prop({ type: SchemaTypes.ObjectId, ref: Darkstores.name, required: true })
  darkStoreId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Users.name, required: true })
  userId: Types.ObjectId;

  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, required: true })
  email: string;

  @Prop({ trim: true, required: true })
  mobile: string;

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

export const VendorsSchema = SchemaFactory.createForClass(Vendors);
