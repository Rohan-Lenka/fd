import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Products } from 'src/schemas/products.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';
import { RolesGuard } from '../users/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';
import { UserRole } from '../users/constants/user-role';

@UseGuards(RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.productsService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.productsService._get(id, query);
  }

  @Post()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.STORE_MANAGER,
    UserRole.VENDOR,
  )
  async create(@ModifyBody(setCreatedBy()) createProductsDto: Products) {
    return await this.productsService._create(createProductsDto);
  }

  @Post('/brands')
  async getBrands(@Body() body: { subCategoryId: string }) {
    return await this.productsService.getBrands(body.subCategoryId);
  }

  @Post('/rate')
  async rateProduct(
    @Body() body: { userId: string; productId: string; stars: number },
  ) {
    return await this.productsService.rateProduct(
      body.userId,
      body.productId,
      body.stars,
    );
  }

  @Patch('/:id?')
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.STORE_MANAGER,
    UserRole.VENDOR,
  )
  async patch(
    @Query() query,
    @Body() patchProductsDto: Partial<Products>,
    @Param('id') id,
  ) {
    return await this.productsService._patch(id, patchProductsDto, query);
  }

  @Delete('/:id?')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_MANAGER)
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.productsService._remove(id, query, user);
  }
}
