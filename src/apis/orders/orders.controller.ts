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
import { OrdersService } from './orders.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Orders } from 'src/schemas/orders.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.ordersService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.ordersService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createOrdersDto: Orders) {
    return await this.ordersService._create(createOrdersDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchOrdersDto: Partial<Orders>,
    @Param('id') id,
  ) {
    return await this.ordersService._patch(id, patchOrdersDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.ordersService._remove(id, query, user);
  }

  @Post('initiate-payment')
  async initiatePayment(
    @Body()
    body: {
      cartId: string;
      // orderAmount: number;
      userId: string;
    },
  ) {
    return await this.ordersService.initiatePayment(body);
  }
}
