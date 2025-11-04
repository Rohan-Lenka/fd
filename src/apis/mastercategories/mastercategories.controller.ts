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
import { MastercategoriesService } from './mastercategories.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Mastercategories } from 'src/schemas/mastercategories.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';
import { UserRole } from '../users/constants/user-role';
import { Roles } from '../users/decorators/roles.decorator';
import { RolesGuard } from '../users/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller('mastercategories')
export class MastercategoriesController {
  constructor(
    private readonly mastercategoriesService: MastercategoriesService,
  ) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.mastercategoriesService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.mastercategoriesService._get(id, query);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_MANAGER)
  async create(
    @ModifyBody(setCreatedBy()) createMastercategoriesDto: Mastercategories,
  ) {
    return await this.mastercategoriesService._create(
      createMastercategoriesDto,
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
    @Body() patchMastercategoriesDto: Partial<Mastercategories>,
    @Param('id') id,
  ) {
    return await this.mastercategoriesService._patch(
      id,
      patchMastercategoriesDto,
      query,
    );
  }

  @Delete('/:id?')
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.mastercategoriesService._remove(id, query, user);
  }
}
