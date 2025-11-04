import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import {
  Mastercategories,
  MastercategoriesDocument,
} from 'src/schemas/mastercategories.schema';

@Injectable()
export class MastercategoriesService extends NestService<
  Mastercategories,
  MastercategoriesDocument
> {
  constructor(
    @InjectModel(Mastercategories.name)
    private readonly mastercategoriesModel: Model<Mastercategories>,
  ) {
    super(mastercategoriesModel);
  }
}
