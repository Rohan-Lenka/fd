import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UsersService } from '../users/users.service';

@Controller('authentication')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('')
  async signIn(@Body() signInDto: Record<string, any>) {
    if (signInDto.strategy === 'local') {
      return this.authService.signInLocal(signInDto.email, signInDto.password);
    }
    if (signInDto.strategy === 'local-phone') {
      return this.authService.signInLocalPhone(signInDto.phone, signInDto.otp);
    }
    throw new BadRequestException('Invalid Strategy');
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('fetch-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Get('verify')
  getProfile(@Request() req) {
    return {
      user: this.usersService.sanitizeUser(req.user),
      organizationUsers: req.orgUsers,
    };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.authService.sendForgotPasswordEmail(email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    if (!token || !newPassword) {
      throw new BadRequestException('Token and new password are required');
    }
    return this.authService.resetPassword(token, newPassword);
  }
}
