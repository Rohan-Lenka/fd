import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Categories } from './categories.schema';

export type SubcategoriesDocument = HydratedDocument<Subcategories>;

@Schema({
  timestamps: true,
})
export class Subcategories {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Categories.name,
    default: null,
    required: true,
  })
  categoryId?: Types.ObjectId;

  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, default: '' })
  slug?: string;

  @Prop({ trim: true, default: '' })
  image?: string;

  @Prop({ type: Number, default: 0 })
  position?: number;

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

export const SubcategoriesSchema = SchemaFactory.createForClass(Subcategories);
