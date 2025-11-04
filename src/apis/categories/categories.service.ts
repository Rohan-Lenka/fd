import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Categories, CategoriesDocument } from 'src/schemas/categories.schema';

@Injectable()
export class CategoriesService extends NestService<
  Categories,
  CategoriesDocument
> {
  constructor(
    @InjectModel(Categories.name)
    private readonly categoriesModel: Model<Categories>,
  ) {
    super(categoriesModel);
  }
}
