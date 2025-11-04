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
import { SubcategoriesService } from './subcategories.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Subcategories } from 'src/schemas/subcategories.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';
import { UserRole } from '../users/constants/user-role';
import { Roles } from '../users/decorators/roles.decorator';
import { RolesGuard } from '../users/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('subCategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.subcategoriesService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.subcategoriesService._get(id, query);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_MANAGER)
  async create(
    @ModifyBody(setCreatedBy()) createSubcategoriesDto: Subcategories,
  ) {
    return await this.subcategoriesService._create(createSubcategoriesDto);
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
    @Body() patchSubcategoriesDto: Partial<Subcategories>,
    @Param('id') id,
  ) {
    return await this.subcategoriesService._patch(
      id,
      patchSubcategoriesDto,
      query,
    );
  }

  @Delete('/:id?')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.subcategoriesService._remove(id, query, user);
  }
}
