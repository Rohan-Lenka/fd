import { Model, Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import {
  Storeproducts,
  StoreproductsDocument,
} from 'src/schemas/storeproducts.schema';
import { DarkstoresService } from '../darkstores/darkstores.service';
import { ProductVarientService } from '../productVarient/productVarient.service';

@Injectable()
export class StoreproductsService extends NestService<
  Storeproducts,
  StoreproductsDocument
> {
  constructor(
    @InjectModel(Storeproducts.name)
    private readonly storeproductsModel: Model<Storeproducts>,
    private readonly darkstoresService: DarkstoresService,
    private readonly productVarientService: ProductVarientService,
  ) {
    super(storeproductsModel);
  }

  async getVarients(storeProductId: string) {
    return await this.productVarientService._find({
      storeProductId,
      $paginate: false,
    });
  }

  async _getSimilarProducts(query: Record<string, any>) {
    const { storeProductId, ...baseQuery } = query;
    if (!storeProductId) {
      throw new BadRequestException('storeProductId is requried !');
    }
    return await this._search({
      ...baseQuery,
      storeProduct: {
        _id: storeProductId,
        match: false,
      },
    });
  }

  async _search(searchQuery: Record<string, any>) {
    const {
      storeProduct,
      text,
      brand,
      tags,
      minPrice,
      maxPrice,
      inStock = true,
      vendorId,
      darkStoreId,
      subCategoryId,
      sortBy,
      longitude,
      latitude,
      $limit = 20,
      $skip = 0,
    } = searchQuery;

    const storeMatch: any = {
      deleted: { $ne: true },
      visibility: { $ne: false },
    };

    if (vendorId) {
      try {
        storeMatch.vendorId = new Types.ObjectId(vendorId);
      } catch (e) {
        /* ignore invalid */
      }
    }
    if (darkStoreId) {
      try {
        storeMatch.darkStoreId = new Types.ObjectId(darkStoreId);
      } catch (e) {
        /* ignore invalid */
      }
    }
    if (minPrice != null || maxPrice != null) {
      storeMatch.sellingPrice = {};
      if (minPrice != null) storeMatch.sellingPrice.$gte = +minPrice;
      if (maxPrice != null) storeMatch.sellingPrice.$lte = +maxPrice;
    }

    // filter by nearby darkStores
    if (latitude && longitude) {
      const nearbyDarkstores =
        await this.darkstoresService._getNearbyDarkstores(
          parseFloat(longitude),
          parseFloat(latitude),
        );
      storeMatch.darkStoreId = { $in: nearbyDarkstores };
    }

    if (storeProduct && storeProduct._id) {
      try {
        const spId = new this.storeproductsModel.db.base.Types.ObjectId(
          storeProduct._id,
        );
        if (storeProduct.match === true) {
          storeMatch._id = spId;
        } else {
          storeMatch._id = { $ne: spId };
        }
      } catch {}
    }

    const basePipeline: any[] = [];

    basePipeline.push({ $match: storeMatch });

    // lookup product
    basePipeline.push({
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      },
    });
    basePipeline.push({
      $unwind: { path: '$product', preserveNullAndEmptyArrays: true },
    });

    // lookup vendor
    basePipeline.push({
      $lookup: {
        from: 'vendors',
        localField: 'vendorId',
        foreignField: '_id',
        as: 'vendor',
      },
    });
    basePipeline.push({
      $unwind: { path: '$vendor', preserveNullAndEmptyArrays: true },
    });

    // lookup darkStore
    basePipeline.push({
      $lookup: {
        from: 'darkstores',
        localField: 'darkStoreId',
        foreignField: '_id',
        as: 'darkstore',
      },
    });
    basePipeline.push({
      $unwind: { path: '$darkstore', preserveNullAndEmptyArrays: true },
    });

    // product-level filters
    const productMatch: any = {};
    if (subCategoryId) {
      try {
        productMatch['product.subCategoryId'] = new Types.ObjectId(
          subCategoryId,
        );
      } catch (e) {
        /* ignore invalid */
      }
    }
    if (brand) {
      productMatch['product.brand'] = {
        $regex: sanitizeText(String(brand)),
        $options: 'i',
      };
    }
    if (Array.isArray(tags) && tags.length) {
      productMatch['product.tags'] = { $in: tags };
    }
    if (text) {
      const t = sanitizeText(String(text));
      productMatch.$or = [
        { 'product.title': { $regex: t, $options: 'i' } },
        { 'product.brand': { $regex: t, $options: 'i' } },
        { 'product.description': { $regex: t, $options: 'i' } },
        { 'product.tags': { $regex: t, $options: 'i' } },
      ];
    }
    if (Object.keys(productMatch).length)
      basePipeline.push({ $match: productMatch });

    // computed fields
    basePipeline.push({
      $addFields: {
        inStock: { $gt: ['$stockQty', 0] },
        computedDiscount: { $subtract: ['$mrp', '$sellingPrice'] },
      },
    });

    if (inStock === true || inStock === 'true') {
      basePipeline.push({ $match: { inStock: true } });
    }

    const sortStage: any = {};
    switch (sortBy) {
      case 'priceLowToHigh':
        sortStage.sellingPrice = 1;
        break;
      case 'priceHighToLow':
        sortStage.sellingPrice = -1;
        break;
      case 'discount':
        sortStage.computedDiscount = -1;
        break;
      case 'newest':
        sortStage.createdAt = -1;
        break;
      case 'oldest':
        sortStage.createdAt = 1;
        break;
      default:
        sortStage.inStock = -1;
        sortStage.sellingPrice = 1;
        break;
    }
    basePipeline.push({ $sort: sortStage });

    // facet for pagination + total count
    const pipeline: any[] = [
      ...basePipeline,
      {
        $facet: {
          data: [
            { $skip: Number($skip) },
            { $limit: Number($limit) },
            {
              $project: {
                _id: 1,
                productId: 1,
                darkStoreId: 1,
                vendorId: 1,
                barcode: 1,
                mrp: 1,
                sellingPrice: 1,
                discount: 1,
                minQty: 1,
                maxQtyPerOrder: 1,
                stockQty: 1,
                lowStockThreshold: 1,
                visibility: 1,
                inStock: 1,
                product: {
                  _id: 1,
                  title: 1,
                  brand: 1,
                  images: 1,
                  tags: 1,
                  description: 1,
                  isVeg: 1,
                  quantity: 1,
                  reviews: 1,
                  stars: 1,
                  totalRating: 1,
                  subCategoryId: 1,
                },
                vendor: { _id: 1, name: 1 },
                darkstore: { _id: 1, name: 1, geoLocation: 1 },
              },
            },
          ],
          totalCount: [{ $count: 'count' }],
        },
      },
    ];

    const aggResult = await this.storeproductsModel
      .aggregate(pipeline)
      .allowDiskUse(true)
      .exec();

    const data = aggResult[0]?.data ?? [];
    const total = aggResult[0]?.totalCount?.[0]?.count ?? 0;
    return {
      total,
      $limit: Number($limit),
      $skip: Number($skip),
      data,
    };
  }
}

function sanitizeText(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
