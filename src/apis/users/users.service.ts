import { Model, Types } from 'mongoose';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Users, UsersDocument } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { UserRole, UserRolesEnum } from './constants/user-role';

@Injectable()
export class UsersService extends NestService<Users, UsersDocument> {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<Users>,
  ) {
    super(usersModel);
  }

  sanitizeUser(user: Users | UsersDocument) {
    if (!user) return null;
    const obj =
      user && typeof (user as any).toObject === 'function'
        ? (user as any).toObject()
        : user;
    delete obj.password;
    return obj;
  }

  async signup(createUsersDto: Partial<Users>) {
    // Check if user already exists
    const existing = await this._find({
      email: createUsersDto.email,
      $limit: 1,
    });

    const existingCount = Array.isArray(existing)
      ? existing.length
      : existing && Array.isArray((existing as any).data)
        ? (existing as any).data.length
        : 0;

    if (existingCount > 0) {
      throw new BadRequestException('User already exists!');
    }

    let userResult;
    if (createUsersDto.role !== UserRole.END_USER) {
      const saltOrRounds = 10;
      const password = await bcrypt.hash(createUsersDto.password, saltOrRounds);
      userResult = await this._create({
        ...createUsersDto,
        password,
      });
    } else {
      // For END_USER, do not save password
      const { password, ...userData } = createUsersDto;
      userResult = await this._create(userData);
    }

    // Handle if userResult is an array or a single object
    const user = Array.isArray(userResult) ? userResult[0] : userResult;

    return user;
  }

  async _create(data: Partial<Users>) {
    const created = new this.usersModel(data);
    return created.save();
  }

  async _find(query: any) {
    const result = await super._find(query);
    return result;
  }

  async _get(id: string, query: any = {}) {
    if (!id || !Types.ObjectId.isValid(id))
      throw new NotFoundException('Invalid user ID');
    const user = await this.usersModel.findById(id, query).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async _patch(id: string, patchUsersDto: Partial<Users>, query: any = {}) {
    if (!id || !Types.ObjectId.isValid(id))
      throw new NotFoundException('Invalid user ID');
    const updated = await this.usersModel
      .findByIdAndUpdate(id, patchUsersDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('User not found');
    return this.sanitizeUser(updated);
  }

  async _remove(
    id: string,
    query: Record<string, any> = {},
    user: Users,
    removeOptions?: { handleSoftDelete: boolean },
  ): Promise<UsersDocument | UsersDocument[]> {
    if (!id || !Types.ObjectId.isValid(id))
      throw new NotFoundException('Invalid user ID');
    // Soft delete: set status to 0 and optionally set deletedBy/deletedAt
    const update: any = { status: 0 };
    if (user && (user as any)._id) update.deletedBy = (user as any)._id;
    update.deletedAt = new Date();
    const deleted = await this.usersModel
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
    if (!deleted) throw new NotFoundException('User not found');
    return deleted;
  }

  async findByEmailWithPassword(email: string) {
    return this.usersModel.findOne({ email }).select('+password').exec();
  }
}
