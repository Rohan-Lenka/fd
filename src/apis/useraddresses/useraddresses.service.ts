import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import {
  Useraddresses,
  UseraddressesDocument,
} from 'src/schemas/useraddresses.schema';

@Injectable()
export class UseraddressesService extends NestService<
  Useraddresses,
  UseraddressesDocument
> {
  constructor(
    @InjectModel(Useraddresses.name)
    private readonly useraddressesModel: Model<Useraddresses>,
  ) {
    super(useraddressesModel);
  }
  async _create(createUseraddressesDto: Useraddresses) {
    const isDefault = createUseraddressesDto.isDefault;
    if (isDefault && isDefault === true) {
      await super._patch(
        null,
        {
          isDefault: false,
        },
        {
          userId: createUseraddressesDto.userId,
          isDefault: true,
        },
      );
    }
    return await super._create(createUseraddressesDto);
  }
}
