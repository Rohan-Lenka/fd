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
import { UseraddressesService } from './useraddresses.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Useraddresses } from 'src/schemas/useraddresses.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('user-addresses')
export class UseraddressesController {
  constructor(private readonly useraddressesService: UseraddressesService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.useraddressesService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.useraddressesService._get(id, query);
  }

  @Post()
  async create(
    @ModifyBody(setCreatedBy()) createUseraddressesDto: Useraddresses,
  ) {
    return await this.useraddressesService._create(createUseraddressesDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchUseraddressesDto: Partial<Useraddresses>,
    @Param('id') id,
  ) {
    return await this.useraddressesService._patch(
      id,
      patchUseraddressesDto,
      query,
    );
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.useraddressesService._remove(id, query, user);
  }
}
