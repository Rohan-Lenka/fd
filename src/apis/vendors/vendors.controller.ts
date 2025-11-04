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
import { VendorsService } from './vendors.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Vendors } from 'src/schemas/vendors.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.vendorsService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.vendorsService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createVendorsDto: Vendors) {
    return await this.vendorsService._create(createVendorsDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchVendorsDto: Partial<Vendors>,
    @Param('id') id,
  ) {
    return await this.vendorsService._patch(id, patchVendorsDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.vendorsService._remove(id, query, user);
  }
}
