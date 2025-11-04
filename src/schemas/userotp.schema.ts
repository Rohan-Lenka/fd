import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from './users.schema';

export type UserotpDocument = HydratedDocument<Userotp>;

@Schema({
  timestamps: true,
})
export class Userotp {
  @Prop({ type: Types.ObjectId, ref: Users.name })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  otp: string;
}

export const UserotpSchema = SchemaFactory.createForClass(Userotp);
