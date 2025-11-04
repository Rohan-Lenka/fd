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
import { SupportTicketsService } from './supportTickets.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { SupportTickets } from 'src/schemas/supportTickets.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('support-tickets')
export class SupportTicketsController {
  constructor(private readonly supportTicketsService: SupportTicketsService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.supportTicketsService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.supportTicketsService._get(id, query);
  }

  @Post()
  async create(
    @ModifyBody(setCreatedBy()) createSupportTicketsDto: SupportTickets,
  ) {
    return await this.supportTicketsService._create(createSupportTicketsDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchSupportTicketsDto: Partial<SupportTickets>,
    @Param('id') id,
  ) {
    return await this.supportTicketsService._patch(
      id,
      patchSupportTicketsDto,
      query,
    );
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.supportTicketsService._remove(id, query, user);
  }
}
