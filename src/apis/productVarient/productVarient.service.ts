import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import {
  ProductVarient,
  ProductVarientDocument,
} from 'src/schemas/productVarient.schema';

@Injectable()
export class ProductVarientService extends NestService<
  ProductVarient,
  ProductVarientDocument
> {
  constructor(
    @InjectModel(ProductVarient.name)
    private readonly productVarientModel: Model<ProductVarient>,
  ) {
    super(productVarientModel);
  }
}
