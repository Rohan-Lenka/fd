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
import { DeliverypartnersService } from './deliverypartners.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Deliverypartners } from 'src/schemas/deliverypartners.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('deliveryPartners')
export class DeliverypartnersController {
  constructor(
    private readonly deliverypartnersService: DeliverypartnersService,
  ) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.deliverypartnersService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.deliverypartnersService._get(id, query);
  }

  @Post()
  async create(
    @ModifyBody(setCreatedBy()) createDeliverypartnersDto: Deliverypartners,
  ) {
    return await this.deliverypartnersService._create(
      createDeliverypartnersDto,
    );
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchDeliverypartnersDto: Partial<Deliverypartners>,
    @Param('id') id,
  ) {
    return await this.deliverypartnersService._patch(
      id,
      patchDeliverypartnersDto,
      query,
    );
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.deliverypartnersService._remove(id, query, user);
  }
}
