import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Users } from './users.schema';
import { Mastercategories } from './mastercategories.schema';

export type CategoriesDocument = HydratedDocument<Categories>;

@Schema({
  timestamps: true,
})
export class Categories {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, default: '' })
  slug?: string;

  @Prop({ trim: true, default: '' })
  image?: string;

  @Prop({ type: Number, default: 0 })
  position?: number;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: Mastercategories.name,
    default: null,
  })
  masterCategoryId?: Types.ObjectId;

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

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
