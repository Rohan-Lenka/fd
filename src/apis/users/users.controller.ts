import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@nest-extended/core/common/decorators/User.decorator';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/schemas/users.schema';
import { Public } from '../auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  @Get()
  async find(@Query() query: Record<string, any>) {
    return await this.usersService._find(query);
  }

  @Get('/:id?')
  async get(@Query() query: Record<string, any>, @Param('id') id: string) {
    return await this.usersService._get(id, query);
  }

  // @Roles(UserRole.ADMIN)
  @Public()
  @Post('signup')
  async signup(@Body() createUsersDto: Partial<Users>) {
    const user = await this.usersService.signup(createUsersDto);
    const sanitizedUser = this.usersService.sanitizeUser(user);
    const payload = { sub: { id: user._id }, user };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: sanitizedUser,
    };
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchUsersDto: Partial<Users>,
    @Param('id') id,
  ) {
    return await this.usersService._patch(id, patchUsersDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query, @User() user) {
    return await this.usersService._remove(id, query, user);
  }
}
