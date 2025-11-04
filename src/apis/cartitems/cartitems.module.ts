import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartitemsController } from './cartitems.controller';
import { CartitemsService } from './cartitems.service';
import { Cartitems, CartitemsSchema } from 'src/schemas/cartitems.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cartitems.name, schema: CartitemsSchema },
    ]),
  ],
  controllers: [CartitemsController],
  providers: [CartitemsService],
  exports: [CartitemsService],
})
export class CartitemsModule {}
