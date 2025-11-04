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
import { StoreproductsService } from './storeproducts.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Storeproducts } from 'src/schemas/storeproducts.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';
import { RolesGuard } from '../users/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';
import { UserRole } from '../users/constants/user-role';

@UseGuards(RolesGuard)
@Controller('storeProducts')
export class StoreproductsController {
  constructor(private readonly storeproductsService: StoreproductsService) {}

  @Get('/search')
  async search(@Query() query: Record<string, any>) {
    return await this.storeproductsService._search(query);
  }

  @Get('/similar')
  async getSimilarProducts(@Query() query: Record<string, any>) {
    return await this.storeproductsService._getSimilarProducts(query);
  }

  @Get()
  async find(@Query() query: Record<string, any>) {
    if (!query.$populate) {
      query.$populate = ['productId'];
    }
    if (
      Array.isArray(query.$populate) &&
      !query.$populate.includes('productId')
    ) {
      query.$populate.push('productId');
    }
    return await this.storeproductsService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    query.$populate = ['productId', 'darkStoreId', 'vendorId'];
    let foundStoreProduct = await this.storeproductsService._get(id, query);
    if (!Array.isArray(foundStoreProduct)) {
      const varients = await this.storeproductsService.getVarients(id);
      foundStoreProduct = {
        ...(foundStoreProduct.toObject?.() || foundStoreProduct),
        // @ts-ignore
        varients: varients,
      };
    }
    return foundStoreProduct;
  }

  @Post()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.STORE_MANAGER,
    UserRole.VENDOR,
  )
  async create(
    @ModifyBody(setCreatedBy()) createStoreproductsDto: Storeproducts,
  ) {
    createStoreproductsDto.discount =
      createStoreproductsDto.mrp - createStoreproductsDto.sellingPrice;
    return await this.storeproductsService._create(createStoreproductsDto);
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
    @Body() patchStoreproductsDto: Partial<Storeproducts>,
    @Param('id') id,
  ) {
    return await this.storeproductsService._patch(
      id,
      patchStoreproductsDto,
      query,
    );
  }

  @Delete('/:id?')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_MANAGER)
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.storeproductsService._remove(id, query, user);
  }
}
