import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UseraddressesController } from './useraddresses.controller';
import { UseraddressesService } from './useraddresses.service';
import {
  Useraddresses,
  UseraddressesSchema,
} from 'src/schemas/useraddresses.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Useraddresses.name, schema: UseraddressesSchema },
    ]),
  ],
  controllers: [UseraddressesController],
  providers: [UseraddressesService],
  exports: [UseraddressesService],
})
export class UseraddressesModule {}
