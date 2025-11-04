import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { UserotpService } from './userotp.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { Userotp } from 'src/schemas/userotp.schema';
import {
  ModifyBody,
  setCreatedBy,
} from '@nest-extended/core/common/decorators/ModifyBody.decorator';
import { Public } from '../auth/decorators/public.decorator'; // Import the Public decorator

@Controller('userotp')
export class UserotpController {
  constructor(private readonly userotpService: UserotpService) {}

  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.userotpService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.userotpService._get(id, query);
  }

  @Post()
  async create(@ModifyBody(setCreatedBy()) createUserotpDto: Userotp) {
    return await this.userotpService._create(createUserotpDto);
  }

  @Public()
  @Post('send')
  async sendOtp(@Body() body: { phone: string }) {
    return await this.userotpService.sendOtp(body.phone);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchUserotpDto: Partial<Userotp>,
    @Param('id') id,
  ) {
    return await this.userotpService._patch(id, patchUserotpDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.userotpService._remove(id, query, user);
  }
}
