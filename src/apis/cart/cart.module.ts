import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from 'src/schemas/cart.schema';
import { CartitemsService } from '../cartitems/cartitems.service';
import { CartitemsModule } from '../cartitems/cartitems.module';
import { Cartitems, CartitemsSchema } from 'src/schemas/cartitems.schema';
import { StoreproductsModule } from '../storeproducts/storeproducts.module';
import { ProductVarientModule } from '../productVarient/productVarient.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Cartitems.name, schema: CartitemsSchema },
    ]),
    CartitemsModule,
    StoreproductsModule,
    ProductVarientModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartitemsService],
  exports: [CartService],
})
export class CartModule {}
