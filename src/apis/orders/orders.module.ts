import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orders, OrdersSchema } from 'src/schemas/orders.schema';
import { CartModule } from '../cart/cart.module';
import { UseraddressesModule } from '../useraddresses/useraddresses.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Orders.name, schema: OrdersSchema }]),
    CartModule,
    UseraddressesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
