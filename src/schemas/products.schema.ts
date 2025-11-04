import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Subcategories } from './subcategories.schema';

export type ProductsDocument = HydratedDocument<Products>;

@Schema({
  timestamps: true,
})
export class Products {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Subcategories.name,
    required: true,
    default: null,
  })
  subCategoryId: Types.ObjectId;

  @Prop({ trim: true, required: true })
  title: string;

  @Prop({ trim: true })
  brand?: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop({ type: Boolean, default: true })
  isVeg?: boolean;

  @Prop({ type: String, default: '' })
  quantity: string;

  @Prop({ trim: true })
  hsn?: string;

  @Prop({ type: Number, default: null })
  gstRate?: number;

  @Prop({ type: Number, default: 0 })
  stars: number;

  @Prop({ type: Number, default: 0 })
  reviews: number;

  @Prop({ type: Number, default: 0 })
  totalRating: number;

  @Prop({ type: Array, default: [] })
  variants?: any[]; // You can define a Variant schema if needed

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

export const ProductsSchema = SchemaFactory.createForClass(Products);
