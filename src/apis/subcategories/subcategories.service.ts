import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import {
  Subcategories,
  SubcategoriesDocument,
} from 'src/schemas/subcategories.schema';

@Injectable()
export class SubcategoriesService extends NestService<
  Subcategories,
  SubcategoriesDocument
> {
  constructor(
    @InjectModel(Subcategories.name)
    private readonly subcategoriesModel: Model<Subcategories>,
  ) {
    super(subcategoriesModel);
  }
}
