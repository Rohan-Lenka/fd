import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Payments, PaymentsDocument } from 'src/schemas/payments.schema';

@Injectable()
export class PaymentsService extends NestService<Payments, PaymentsDocument> {
  constructor(
    @InjectModel(Payments.name)
    private readonly paymentsModel: Model<Payments>,
  ) {
    super(paymentsModel);
  }
}
