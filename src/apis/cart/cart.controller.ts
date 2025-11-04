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
import { CartService } from './cart.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Cart } from 'src/schemas/cart.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';
import { CartitemsService } from '../cartitems/cartitems.service'; // Add this import

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartitemsService: CartitemsService, // Inject CartitemsService
  ) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.cartService._find(query);
  }

  @Get('/get-cart')
  async getCart(@Query() query: { userId: string }) {
    return await this.cartService._getCart(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.cartService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createCartDto: Cart) {
    return await this.cartService._create(createCartDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchCartDto: Partial<Cart>,
    @Param('id') id,
  ) {
    return await this.cartService._patch(id, patchCartDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.cartService._remove(id, query, user);
  }

  @Post('add-item')
  async addToCart(
    @Body()
    body: {
      userId: string;
      darkStoreId: string;
      storeProductId: string;
      productVarientId?: string;
      qty: number;
      // priceAtAdd: number;
    },
  ) {
    return await this.cartService.addToCart(body);
  }
}
