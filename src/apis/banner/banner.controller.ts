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
import { BannerService } from './banner.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Banner } from 'src/schemas/banner.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.bannerService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.bannerService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createBannerDto: Banner) {
    return await this.bannerService._create(createBannerDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchBannerDto: Partial<Banner>,
    @Param('id') id,
  ) {
    return await this.bannerService._patch(id, patchBannerDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.bannerService._remove(id, query, user);
  }
}
