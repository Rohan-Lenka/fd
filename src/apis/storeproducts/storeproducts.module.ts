import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreproductsController } from './storeproducts.controller';
import { StoreproductsService } from './storeproducts.service';
import {
  Storeproducts,
  StoreproductsSchema,
} from 'src/schemas/storeproducts.schema';
import { DarkstoresModule } from '../darkstores/darkstores.module';
import { ProductVarientModule } from '../productVarient/productVarient.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Storeproducts.name, schema: StoreproductsSchema },
    ]),
    DarkstoresModule,
    ProductVarientModule,
  ],
  controllers: [StoreproductsController],
  providers: [StoreproductsService],
  exports: [StoreproductsService],
})
export class StoreproductsModule {}
