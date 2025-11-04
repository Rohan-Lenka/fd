import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductVarientController } from './productVarient.controller';
import { ProductVarientService } from './productVarient.service';
import {
  ProductVarient,
  ProductVarientSchema,
} from 'src/schemas/productVarient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductVarient.name, schema: ProductVarientSchema },
    ]),
  ],
  controllers: [ProductVarientController],
  providers: [ProductVarientService],
  exports: [ProductVarientService],
})
export class ProductVarientModule {}
