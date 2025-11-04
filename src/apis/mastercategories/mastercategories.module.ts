import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MastercategoriesController } from './mastercategories.controller';
import { MastercategoriesService } from './mastercategories.service';
import {
  Mastercategories,
  MastercategoriesSchema,
} from 'src/schemas/mastercategories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mastercategories.name, schema: MastercategoriesSchema },
    ]),
  ],
  controllers: [MastercategoriesController],
  providers: [MastercategoriesService],
  exports: [MastercategoriesService],
})
export class MastercategoriesModule {}
