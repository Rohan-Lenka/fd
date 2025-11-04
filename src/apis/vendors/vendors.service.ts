import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Vendors, VendorsDocument } from 'src/schemas/vendors.schema';
import { UserRole } from '../users/constants/user-role';
import { Users } from 'src/schemas/users.schema';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VendorsService extends NestService<Vendors, VendorsDocument> {
  constructor(
    @InjectModel(Vendors.name)
    private readonly vendorsModel: Model<Vendors>,
    private readonly usersService: UsersService,
  ) {
    super(vendorsModel);
  }
  async _create(createVendorsDto: Vendors) {
    const { name, email, mobile, status, ...rest } = createVendorsDto;
    let password = (createVendorsDto as any).password;
    const role: number = UserRole.VENDOR;
    const existing1 = await this.usersService._find({
      role: role,
      email: email,
      $paginate: false,
    });
    const existing2 = await this.usersService._find({
      role: role,
      phone: mobile,
      $paginate: false,
    });
    const existing =
      (Array.isArray(existing1) && existing1.length > 0) ||
      (Array.isArray(existing2) && existing2.length > 0) ||
      false;
    if (existing) {
      throw new BadRequestException('Vendor already exists !');
    }
    const saltOrRounds = 10;
    password = await bcrypt.hash(password, saltOrRounds);
    const createUserDto: Partial<Users> = {
      role: role,
      firstName: name,
      email: email,
      phone: mobile,
      status: status === 'active' ? 1 : 0,
      password: password,
    };
    const createdUser = await this.usersService._create(createUserDto);
    const vendorData = {
      userId: createdUser._id,
      ...createVendorsDto,
    };
    return await super._create(vendorData);
  }
}
