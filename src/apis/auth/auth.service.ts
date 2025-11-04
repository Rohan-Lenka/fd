import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserotpService } from '../userotp/userotp.service';
import { Users } from 'src/schemas/users.schema';
import { randomBytes } from 'crypto';
import { sendMail } from 'src/utils/mail-service/sendMail';
import { UserRole } from '../users/constants/user-role';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userotpService: UserotpService,
  ) {}

  async signInLocal(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user || !user.password) throw new UnauthorizedException();

    if (user.role === UserRole.DELIVERY_PARTNER)
      throw new BadRequestException(
        'This method of authentication is prohibited.',
      );

    const passwordValid = await bcrypt.compare(pass, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException();
    }

    const sanitizedUser = this.usersService.sanitizeUser(user);
    const payload = { sub: { id: user._id }, user };

    // Generate 12 char dummy refresh token
    const refreshToken = Math.random().toString(36).slice(2, 14);

    await this.usersService._patch(user._id.toString(), {
      lastLoginAt: new Date(),
      refreshToken,
    });

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
      user: sanitizedUser,
    };
  }

  async signInLocalPhone(phone: string, otp: string): Promise<any> {
    // Find user by phone
    const res = await this.usersService._find({ phone });
    // @ts-ignore
    const users = res.data;
    let user = users && users.length > 0 ? users[0] : null;
    let existingUser = !!user;

    // Verify OTP regardless of whether the user exists
    // If user exists, look up OTP by userId; otherwise look up by phone
    const userotpQuery = user ? { userId: user._id } : { phone };
    const userotpArrOrPaginated = await this.userotpService._find(userotpQuery);

    let userotpArr: any[] = [];
    if (Array.isArray(userotpArrOrPaginated)) {
      userotpArr = userotpArrOrPaginated;
    } else if (
      userotpArrOrPaginated &&
      Array.isArray(userotpArrOrPaginated.data)
    ) {
      userotpArr = userotpArrOrPaginated.data;
    }

    const foundOtp =
      userotpArr && userotpArr.length > 0 ? userotpArr[0].otp : null;
    if (!foundOtp || foundOtp !== otp) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // If user not present, create one (after OTP has been validated)
    if (!user) {
      const created = await this.usersService._create({
        phone,
        role: UserRole.END_USER,
        firstName: '',
        lastName: '',
      });
      // @ts-ignore
      user =
        created && (created as any)._id
          ? created
          : (created as any).data &&
              Array.isArray((created as any).data) &&
              (created as any).data.length > 0
            ? (created as any).data[0]
            : created;
      existingUser = false;
    }

    if (
      user.role !== UserRole.DELIVERY_PARTNER &&
      user.role !== UserRole.END_USER
    )
      throw new BadRequestException(
        'This method of authentication is prohibited.',
      );

    const sanitizedUser = this.usersService.sanitizeUser(user);
    const payload = { sub: { id: user._id }, user };

    // Generate 12 char dummy refresh token
    const refreshToken = Math.random().toString(36).slice(2, 14);

    await this.usersService._patch(user._id.toString(), {
      lastLoginAt: new Date(),
      refreshToken,
    });

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken,
      user: sanitizedUser,
      existingUser,
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const res = await this.usersService._find({ refreshToken });
    // @ts-ignore
    const users = res.data;
    const user = users && users.length > 0 ? users[0] : null;
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate new 12 char dummy refresh token
    const newRefreshToken = Math.random().toString(36).slice(2, 14);

    await this.usersService._patch(user._id.toString(), {
      refreshToken: newRefreshToken,
    });

    const sanitizedUser = this.usersService.sanitizeUser(user);
    const payload = { sub: { id: user._id }, user };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: newRefreshToken,
      user: sanitizedUser,
    };
  }

  async sendForgotPasswordEmail(email: string) {
    const res = await this.usersService._find({ email });
    // @ts-ignore
    const user = res.data;
    if (!user || user.length === 0) {
      throw new BadRequestException('User not found');
    }
    const foundUser = user[0];

    // Generate a reset token
    const resetToken = randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

    // Save token and expiry to user
    await this.usersService._patch(foundUser._id.toString(), {
      resetPasswordToken: resetToken,
      resetPasswordExpires: tokenExpiry,
    });

    await sendMail('Flashnow', email, 'Reset Password', 'reset-password', {
      appName: 'Flashnow',
      firstName: foundUser.firstName,
      // TODO: add the reset password url after frontend is done
      // eg -> resetUrl: `${frontendUrl}/reset?token=resetToken`
      resetUrl: 'reset url',
      expiryTime: '15 minutes',
    });

    // For now, just return the token for testing
    return { success: true, message: 'Reset token generated', resetToken };
  }

  async resetPassword(token: string, newPassword: string) {
    // Find user by reset token and check expiry
    const res = await this.usersService._find({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });
    // @ts-ignore
    const users = res.data;
    const user = users && users.length > 0 ? users[0] : null;
    if (!user) throw new BadRequestException('Invalid or expired token');

    // Hash new password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);

    // Update password and clear reset token
    await this.usersService._patch(user._id.toString(), {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return { success: true, message: 'Password reset successful' };
  }
}
