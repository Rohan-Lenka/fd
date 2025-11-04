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
import { FaqService } from './faq.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Faq } from 'src/schemas/faq.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.faqService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.faqService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createFaqDto: Faq) {
    return await this.faqService._create(createFaqDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchFaqDto: Partial<Faq>,
    @Param('id') id,
  ) {
    return await this.faqService._patch(id, patchFaqDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.faqService._remove(id, query, user);
  }
}
