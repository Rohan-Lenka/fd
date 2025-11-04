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
import { CartitemsService } from './cartitems.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Cartitems } from 'src/schemas/cartitems.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('cartItems')
export class CartitemsController {
  constructor(private readonly cartitemsService: CartitemsService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.cartitemsService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.cartitemsService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createCartitemsDto: Cartitems) {
    return await this.cartitemsService._create(createCartitemsDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchCartitemsDto: Partial<Cartitems>,
    @Param('id') id,
  ) {
    return await this.cartitemsService._patch(id, patchCartitemsDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.cartitemsService._remove(id, query, user);
  }
}
