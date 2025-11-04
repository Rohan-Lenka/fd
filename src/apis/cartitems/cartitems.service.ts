import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Cartitems, CartitemsDocument } from 'src/schemas/cartitems.schema';

@Injectable()
export class CartitemsService extends NestService<
  Cartitems,
  CartitemsDocument
> {
  constructor(
    @InjectModel(Cartitems.name)
    private readonly cartitemsModel: Model<Cartitems>,
  ) {
    super(cartitemsModel);
  }
}
