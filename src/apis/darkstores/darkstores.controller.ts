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
import { DarkstoresService } from './darkstores.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Darkstores } from 'src/schemas/darkstores.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';
import { RolesGuard } from '../users/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';
import { UserRole } from '../users/constants/user-role';

@UseGuards(RolesGuard)
@Controller('darkStores')
export class DarkstoresController {
  constructor(private readonly darkstoresService: DarkstoresService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.darkstoresService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.darkstoresService._get(id, query);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STORE_MANAGER)
  @Post()
  async create(@ModifyBody(setCreatedBy()) createDarkstoresDto: Darkstores) {
    return await this.darkstoresService._create(createDarkstoresDto);
  }

  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.STORE_MANAGER,
    UserRole.VENDOR,
  )
  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchDarkstoresDto: Partial<Darkstores>,
    @Param('id') id,
  ) {
    return await this.darkstoresService._patch(id, patchDarkstoresDto, query);
  }

  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.darkstoresService._remove(id, query, user);
  }
}
