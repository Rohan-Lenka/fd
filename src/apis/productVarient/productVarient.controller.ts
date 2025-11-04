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
import { ProductVarientService } from './productVarient.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { ProductVarient } from 'src/schemas/productVarient.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('product-varient')
export class ProductVarientController {
  constructor(private readonly productVarientService: ProductVarientService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.productVarientService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.productVarientService._get(id, query);
  }

  @Post()
  async create(
    @ModifyBody(setCreatedBy()) createProductVarientDto: ProductVarient,
  ) {
    return await this.productVarientService._create(createProductVarientDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchProductVarientDto: Partial<ProductVarient>,
    @Param('id') id,
  ) {
    return await this.productVarientService._patch(
      id,
      patchProductVarientDto,
      query,
    );
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.productVarientService._remove(id, query, user);
  }
}
