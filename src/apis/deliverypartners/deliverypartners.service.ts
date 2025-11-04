import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import {
  Deliverypartners,
  DeliverypartnersDocument,
} from 'src/schemas/deliverypartners.schema';

@Injectable()
export class DeliverypartnersService extends NestService<
  Deliverypartners,
  DeliverypartnersDocument
> {
  constructor(
    @InjectModel(Deliverypartners.name)
    private readonly deliverypartnersModel: Model<Deliverypartners>,
  ) {
    super(deliverypartnersModel);
  }
}
