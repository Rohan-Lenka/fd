import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Products } from './products.schema';
import { Vendors } from './vendors.schema';
import { Darkstores } from './darkstores.schema';

export type StoreproductsDocument = HydratedDocument<Storeproducts>;

@Schema({
  timestamps: true,
})
export class Storeproducts {
  @Prop({ type: SchemaTypes.ObjectId, ref: Products.name, required: true })
  productId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Darkstores.name, required: true })
  darkStoreId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Vendors.name, required: true })
  vendorId: Types.ObjectId;

  @Prop({ trim: true })
  barcode?: string;

  @Prop({ type: Number, required: true })
  mrp: number;

  @Prop({ type: Number, required: true })
  sellingPrice: number;

  @Prop({ type: Number, default: 0 })
  discount?: number;

  @Prop({ type: Number, default: 1 })
  minQty?: number;

  @Prop({ type: Number, default: 10 })
  maxQtyPerOrder?: number;

  @Prop({ type: Number, default: 0 })
  stockQty?: number;

  @Prop({ type: Number, default: 0 })
  lowStockThreshold?: number;

  @Prop({ type: Number, default: 0 })
  reorderLeadTimeDays?: number;

  @Prop({ type: Boolean, default: true })
  visibility?: boolean;

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

export const StoreproductsSchema = SchemaFactory.createForClass(Storeproducts);
