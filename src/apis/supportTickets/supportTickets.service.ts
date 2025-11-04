import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import {
  SupportTickets,
  SupportTicketsDocument,
} from 'src/schemas/supportTickets.schema';

@Injectable()
export class SupportTicketsService extends NestService<
  SupportTickets,
  SupportTicketsDocument
> {
  constructor(
    @InjectModel(SupportTickets.name)
    private readonly supportTicketsModel: Model<SupportTickets>,
  ) {
    super(supportTicketsModel);
  }
}
