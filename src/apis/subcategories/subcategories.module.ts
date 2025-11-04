import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';
import {
  Subcategories,
  SubcategoriesSchema,
} from 'src/schemas/subcategories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subcategories.name, schema: SubcategoriesSchema },
    ]),
  ],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  exports: [SubcategoriesService],
})
export class SubcategoriesModule {}
