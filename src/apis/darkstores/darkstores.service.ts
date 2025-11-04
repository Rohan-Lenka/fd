import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Darkstores, DarkstoresDocument } from 'src/schemas/darkstores.schema';
import {
  assignFilters,
  FILTERS,
  rawQuery,
} from '@nest-extended/core/common/query.utils';
import { nestify } from '@nest-extended/core/common/nestify';
import options from '@nest-extended/core/common/options';

@Injectable()
export class DarkstoresService extends NestService<
  Darkstores,
  DarkstoresDocument
> {
  constructor(
    @InjectModel(Darkstores.name)
    private readonly darkstoresModel: Model<Darkstores>,
  ) {
    super(darkstoresModel);
  }

  async _find(
    query: Record<string, any> = {},
    findOptions = {
      handleSoftDelete: true,
    },
  ) {
    if (!findOptions.handleSoftDelete) {
      throw new BadRequestException(
        'findOptions.handleSoftDelete not provided in _find.',
      );
    }

    query['deleted'] = { $ne: true };

    const filters = assignFilters({}, query, FILTERS, {});
    const searchQuery = rawQuery(query);
    const isPaginationDisabled =
      query.$paginate === false || query.$paginate === 'false';

    const q = this.darkstoresModel.find(searchQuery).populate('createdBy', {
      resetPasswordToken: 0,
      resetPasswordExpires: 0,
      refreshToken: 0,
    });

    nestify(q, filters, options, isPaginationDisabled);

    if (isPaginationDisabled) {
      return (await q.exec()) as DarkstoresDocument[];
    }

    const [data, total] = await Promise.all([
      q.exec(),
      this.darkstoresModel.countDocuments({
        deleted: { $ne: true },
        ...searchQuery,
      }),
    ]);

    return {
      total,
      $limit: Number(filters.$limit) || options.defaultLimit,
      $skip: Number(filters.$skip) || options.defaultSkip,
      data,
    };
  }

  async _getNearbyDarkstores(longitude: number, latitude: number) {
    if (longitude == null || latitude == null) return [];

    const nearby = await this.darkstoresModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distance',
          spherical: true,
          distanceMultiplier: 0.001,
          query: { isServiceable: true, deleted: { $ne: true } },
        },
      },
      {
        $match: {
          $expr: { $lte: ['$distance', '$servingRadiusKm'] },
        },
      },
      { $project: { _id: 1 } },
    ]);

    return nearby.map((store) => store._id);
  }
}
