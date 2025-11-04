import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Cart } from './cart.schema';
import { Storeproducts } from './storeproducts.schema';
import { ProductVarient } from './productVarient.schema';

export type CartitemsDocument = HydratedDocument<Cartitems>;

@Schema({
  timestamps: true,
})
export class Cartitems {
  @Prop({ type: SchemaTypes.ObjectId, ref: Cart.name, required: true })
  cartId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Storeproducts.name, required: true })
  storeProductId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: ProductVarient.name, default: null })
  productVarientId?: Types.ObjectId;

  @Prop({ type: Number, required: true })
  qty: number;

  @Prop({ type: Number, required: true })
  priceAtAdd: number;

  @Prop({ type: Number, required: true })
  mrpAtAdd: number;

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

export const CartitemsSchema = SchemaFactory.createForClass(Cartitems);
