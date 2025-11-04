import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DarkstoresController } from './darkstores.controller';
import { DarkstoresService } from './darkstores.service';
import { Darkstores, DarkstoresSchema } from 'src/schemas/darkstores.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Darkstores.name, schema: DarkstoresSchema },
    ]),
  ],
  controllers: [DarkstoresController],
  providers: [DarkstoresService],
  exports: [DarkstoresService],
})
export class DarkstoresModule {}
