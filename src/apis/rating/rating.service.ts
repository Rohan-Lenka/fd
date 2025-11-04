import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Rating, RatingDocument } from 'src/schemas/rating.schema';

@Injectable()
export class RatingService extends NestService<Rating, RatingDocument> {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<Rating>,
  ) {
    super(ratingModel);
  }
}
