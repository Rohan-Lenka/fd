import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from 'src/schemas/cart.schema';
import { CartitemsService } from '../cartitems/cartitems.service';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { StoreproductsService } from '../storeproducts/storeproducts.service';
import { ProductVarientService } from '../productVarient/productVarient.service';

@Injectable()
export class CartService extends NestService<Cart, CartDocument> {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    private readonly cartitemsService: CartitemsService,
    private readonly storeproductsService: StoreproductsService,
    private readonly productVarientService: ProductVarientService,
  ) {
    super(cartModel);
  }

  async addToCart({
    userId,
    darkStoreId,
    storeProductId,
    productVarientId,
    qty,
    // priceAtAdd,
  }: {
    userId: string;
    darkStoreId: string;
    storeProductId: string;
    productVarientId?: string;
    qty: number;
    // priceAtAdd: number;
  }) {
    // 1. Find or create cart for user and darkStore
    let cartRes = await this._find({ userId, darkStoreId });
    let cart: any = null;
    if (Array.isArray(cartRes)) {
      cart = cartRes.length > 0 ? cartRes[0] : null;
    } else if (cartRes && cartRes.data && Array.isArray(cartRes.data)) {
      cart = cartRes.data.length > 0 ? cartRes.data[0] : null;
    }
    if (!cart) {
      cart = await this._create({
        userId: new this.cartModel.db.base.Types.ObjectId(userId),
        darkStoreId: new this.cartModel.db.base.Types.ObjectId(darkStoreId),
      });
    }

    // fetch the storeProduct
    const foundStoreProduct =
      await this.storeproductsService._get(storeProductId);
    if (Array.isArray(foundStoreProduct)) {
      throw new BadRequestException('Invalid store product Id');
    }

    // fetch the productVarient
    let foundProductVarient = null;
    if (productVarientId) {
      foundProductVarient =
        await this.productVarientService._get(productVarientId);
      if (Array.isArray(foundProductVarient)) {
        throw new BadRequestException('Invalid product varient Id');
      }
    }
    const priceAtAdd = productVarientId
      ? foundProductVarient.price
      : foundStoreProduct.sellingPrice;

    const mrpAtAdd = productVarientId
      ? foundProductVarient.mrp
      : foundStoreProduct.mrp;

    // 2. Check if item already exists in cartitems
    const existingItemRes = await this.cartitemsService._find({
      cartId: cart._id,
      storeProductId,
      productVarientId,
    });
    let cartItem;
    let items: any[] = [];

    if (Array.isArray(existingItemRes)) {
      items = existingItemRes;
    } else if (existingItemRes && Array.isArray(existingItemRes.data)) {
      items = existingItemRes.data;
    }

    if (items.length > 0) {
      // Update quantity if item exists
      cartItem = await this.cartitemsService._patch(items[0]._id, {
        qty,
      });
    } else {
      // Add new item
      cartItem = await this.cartitemsService._create({
        cartId: cart._id,
        storeProductId: new this.cartModel.db.base.Types.ObjectId(
          storeProductId,
        ),
        productVarientId: productVarientId
          ? new this.cartModel.db.base.Types.ObjectId(productVarientId)
          : null,
        qty,
        priceAtAdd,
        mrpAtAdd,
      });
    }

    // Calculate new subtotal
    const cartItemsRes = await this.cartitemsService._find({
      cartId: cart._id,
    });
    let allItems: any[] = [];
    if (Array.isArray(cartItemsRes)) {
      allItems = cartItemsRes;
    } else if (cartItemsRes && Array.isArray(cartItemsRes.data)) {
      allItems = cartItemsRes.data;
    }

    let subtotal = 0,
      mrptotal = 0,
      totalItems = 0;
    for (let i = 0; i < allItems.length; i++) {
      subtotal += allItems[i].qty * allItems[i].priceAtAdd;
      mrptotal += allItems[i].qty * allItems[i].mrpAtAdd;
      totalItems += allItems[i].qty;
    }

    // Update cart subtotal
    const updatedCart = await this._patch(cart._id, {
      subtotal,
      mrptotal,
      totalItems,
    });

    return { success: true, updatedCart, cartItem };
  }

  async _getCart(query: { userId: string }) {
    const { userId, ...rest } = query;

    if (!userId) {
      throw new BadRequestException('userId is required !');
    }

    const response = await super._find({
      userId,
      $select:
        '-createdBy -updatedBy -deleted -deletedBy -deletedAt -createdAt -updatedAt',
      $paginate: false,
    });

    if (Array.isArray(response) && response.length === 0) {
      throw new NotFoundException('Cart not found !');
    }

    let foundCart = response[0];

    const baseQuery = {
      $populate: {
        path: 'storeProductId productVarientId',
        select:
          '-createdBy -updatedBy -deleted -deletedBy -deletedAt -createdAt -updatedAt',
        populate: {
          path: 'productId',
          select: 'images isVeg quantity title brand',
        },
      },
      $select: 'priceAtAdd mrpAtAdd qty productVarientId',
    };

    const foundCartItems = await this.cartitemsService._find({
      ...baseQuery,
      cartId: foundCart._id,
      $paginate: false,
    });

    return { cart: foundCart, cartItems: foundCartItems };
  }
}
