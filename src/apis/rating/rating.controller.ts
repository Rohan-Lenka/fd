import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RatingService } from './rating.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Rating } from 'src/schemas/rating.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.ratingService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.ratingService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createRatingDto: Rating) {
    return await this.ratingService._create(createRatingDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchRatingDto: Partial<Rating>,
    @Param('id') id,
  ) {
    return await this.ratingService._patch(id, patchRatingDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.ratingService._remove(id, query, user);
  }
}
