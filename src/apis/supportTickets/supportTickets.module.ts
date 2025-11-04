import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportTicketsController } from './supportTickets.controller';
import { SupportTicketsService } from './supportTickets.service';
import {
  SupportTickets,
  SupportTicketsSchema,
} from 'src/schemas/supportTickets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SupportTickets.name, schema: SupportTicketsSchema },
    ]),
  ],
  controllers: [SupportTicketsController],
  providers: [SupportTicketsService],
  exports: [SupportTicketsService],
})
export class SupportTicketsModule {}
