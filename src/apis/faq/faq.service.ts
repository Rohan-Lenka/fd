import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Faq, FaqDocument } from 'src/schemas/faq.schema';

@Injectable()
export class FaqService extends NestService<Faq, FaqDocument> {
  constructor(@InjectModel(Faq.name) private readonly faqModel: Model<Faq>) {
    super(faqModel);
  }
}
