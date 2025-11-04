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
import { PaymentsService } from './payments.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Payments } from 'src/schemas/payments.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.paymentsService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.paymentsService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createPaymentsDto: Payments) {
    return await this.paymentsService._create(createPaymentsDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchPaymentsDto: Partial<Payments>,
    @Param('id') id,
  ) {
    return await this.paymentsService._patch(id, patchPaymentsDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.paymentsService._remove(id, query, user);
  }
}
