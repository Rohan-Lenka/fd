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
import { CategoriesService } from './categories.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Categories } from 'src/schemas/categories.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';
import { UserRole } from '../users/constants/user-role';
import { Roles } from '../users/decorators/roles.decorator';
import { RolesGuard } from '../users/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.categoriesService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.categoriesService._get(id, query);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_MANAGER)
  async create(@ModifyBody(setCreatedBy()) createCategoriesDto: Categories) {
    return await this.categoriesService._create(createCategoriesDto);
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
    @Body() patchCategoriesDto: Partial<Categories>,
    @Param('id') id,
  ) {
    return await this.categoriesService._patch(id, patchCategoriesDto, query);
  }

  @Delete('/:id?')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.categoriesService._remove(id, query, user);
  }
}
