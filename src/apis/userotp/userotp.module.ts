import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserotpController } from './userotp.controller';
import { UserotpService } from './userotp.service';
import { Userotp, UserotpSchema } from 'src/schemas/userotp.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Userotp.name, schema: UserotpSchema }]),
    UsersModule,
  ],
  controllers: [UserotpController],
  providers: [UserotpService],
  exports: [UserotpService],
})
export class UserotpModule {}
