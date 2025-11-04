import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Banner, BannerDocument } from 'src/schemas/banner.schema';

@Injectable()
export class BannerService extends NestService<Banner, BannerDocument> {
  constructor(
    @InjectModel(Banner.name) private readonly bannerModel: Model<Banner>,
  ) {
    super(bannerModel);
  }
}
