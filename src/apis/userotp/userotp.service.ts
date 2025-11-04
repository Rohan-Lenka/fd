import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Userotp, UserotpDocument } from 'src/schemas/userotp.schema';
import axios from 'axios';
import { Types } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserotpService extends NestService<Userotp, UserotpDocument> {
  constructor(
    @InjectModel(Userotp.name)
    private readonly userotpModel: Model<Userotp>,
    private readonly usersService: UsersService,
  ) {
    super(userotpModel);
  }

  async sendOtp(phone: string) {
    const result = await this.usersService._find({ phone });
    // @ts-ignore
    const users = result?.data || [];

    const userotpObj = {
      otp: 1234,
      phone: phone,
    };
    const foundUser = users[0];
    if (foundUser) {
      userotpObj['userId'] = foundUser._id;
    }
    // for production
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // for dev, default otp

    // Save OTP to userotp collection
    await this.userotpModel.create(userotpObj);

    const data = JSON.stringify({ OTP: userotpObj.otp });

    const config = {
      method: 'get',
      url: `https://api.msg91.com/api/v5/otp?template_id=65b1027ad6fc05061534a9a2&mobile=${phone}&authkey=${process.env.MSG91_API_KEY}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      await axios(config);
      return { success: true, message: 'OTP sent successfully' };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send OTP',
        error: error.response?.data || error.message,
      };
    }
  }
}
