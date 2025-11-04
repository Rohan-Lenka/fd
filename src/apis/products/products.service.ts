import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Products, ProductsDocument } from 'src/schemas/products.schema';
import { RatingService } from '../rating/rating.service';

@Injectable()
export class ProductsService extends NestService<Products, ProductsDocument> {
  constructor(
    @InjectModel(Products.name)
    private readonly productsModel: Model<Products>,
    private readonly ratingService: RatingService,
  ) {
    super(productsModel);
  }
  async getBrands(subCategoryId: string) {
    const brands = await super._find({
      subCategoryId: subCategoryId,
      $select: 'brand',
      $paginate: false,
    });
    return brands;
  }

  async rateProduct(userId: string, productId: string, stars: number) {
    const foundProduct = await super._find({
      _id: productId,
      $paginate: false,
    });

    if (Array.isArray(foundProduct) && foundProduct.length === 0) {
      throw new BadRequestException('Invalid product Id');
    }

    const foundRating = await this.ratingService._find({
      userId: userId,
      productId: productId,
      $paginate: false,
    });

    if (Array.isArray(foundRating) && foundRating.length === 0) {
      await this.ratingService._create({
        userId: new this.productsModel.db.base.Types.ObjectId(userId),
        productId: new this.productsModel.db.base.Types.ObjectId(productId),
        stars,
      });

      const updatedProduct = await this._patch(productId, {
        stars: foundProduct[0].stars + stars,
        reviews: foundProduct[0].reviews + 1,
        totalRating: (
          (foundProduct[0].stars + stars) /
          (foundProduct[0].reviews + 1)
        ).toFixed(1),
      });

      return updatedProduct;
    } else if (Array.isArray(foundRating) && foundRating.length > 0) {
      await this.ratingService._patch(foundRating[0]._id.toString(), {
        stars: stars,
      });

      const updatedProduct = await this._patch(productId, {
        stars: foundProduct[0].stars - foundRating[0].stars + stars,
        totalRating: (
          (foundProduct[0].stars - foundRating[0].stars + stars) /
          foundProduct[0].reviews
        ).toFixed(1),
      });

      return updatedProduct;
    } else {
      throw new BadRequestException('unknown error occured');
    }
  }
}
