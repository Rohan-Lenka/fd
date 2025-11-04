import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Products } from './products.schema';
import { Darkstores } from './darkstores.schema';
import { Storeproducts } from './storeproducts.schema';

export type ProductVarientDocument = HydratedDocument<ProductVarient>;

@Schema({
  timestamps: true,
})
export class ProductVarient {
  @Prop({ type: SchemaTypes.ObjectId, ref: Products.name, required: true })
  productId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Darkstores.name, required: true })
  darkStoreId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Storeproducts.name, required: true })
  storeProductId: Types.ObjectId;

  @Prop({ type: String, required: true, default: '' })
  name?: string;

  @Prop({ type: String, default: '' })
  quantity: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true, default: 0 })
  mrp?: number;

  @Prop({ type: Number, required: true, default: 0 })
  discount?: number;

  @Prop({
    type: Types.ObjectId,
    ref: Users.name,
    default: null,
  })
  createdBy?: Types.ObjectId;

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
    default: false,
  })
  deleted?: boolean;

  @Prop({
    type: Date,
    default: null,
  })
  deletedAt?: Date;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const ProductVarientSchema =
  SchemaFactory.createForClass(ProductVarient);
