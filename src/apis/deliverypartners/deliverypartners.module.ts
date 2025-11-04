import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliverypartnersController } from './deliverypartners.controller';
import { DeliverypartnersService } from './deliverypartners.service';
import {
  Deliverypartners,
  DeliverypartnersSchema,
} from 'src/schemas/deliverypartners.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Deliverypartners.name, schema: DeliverypartnersSchema },
    ]),
  ],
  controllers: [DeliverypartnersController],
  providers: [DeliverypartnersService],
  exports: [DeliverypartnersService],
})
export class DeliverypartnersModule {}
