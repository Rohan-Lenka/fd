import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NestService } from '@nest-extended/core/lib/nest.service';
import { Orders, OrdersDocument } from 'src/schemas/orders.schema';
import Razorpay from 'razorpay';
import { CartService } from '../cart/cart.service';
import { UseraddressesService } from '../useraddresses/useraddresses.service';

@Injectable()
export class OrdersService extends NestService<Orders, OrdersDocument> {
  constructor(
    @InjectModel(Orders.name)
    private readonly ordersModel: Model<Orders>,
    private readonly cartService: CartService,
    private readonly useraddressesService: UseraddressesService,
  ) {
    super(ordersModel);
  }

  async initiatePayment({
    cartId,
    // orderAmount,
    userId,
  }: {
    cartId: string;
    // orderAmount: number;
    userId: string;
  }) {
    const foundCart = await this.cartService._get(cartId);
    if (Array.isArray(foundCart)) {
      throw new BadRequestException('Invalid Cart Id');
    }
    const orderAmount = foundCart.subtotal;

    const foundUserAddress = await this.useraddressesService._find({
      $paginate: false,
      $userId: userId,
    });
    if (!Array.isArray(foundUserAddress) || foundUserAddress.length === 0) {
      throw new BadRequestException('User Address doesnt exixts !');
    }

    // 1. Create order in DB
    const orderData = await this._create({
      cartId: new (require('mongoose').Types.ObjectId)(cartId),
      addressId: foundUserAddress[0]._id,
      darkStoreId: foundCart.darkStoreId,
      orderAmount,
      userId: new (require('mongoose').Types.ObjectId)(userId),
      orderUniqueId: `ORD-${Date.now()}`,
      paymentStatus: 'pending',
      isStatusPaid: false,
      createdBy: new (require('mongoose').Types.ObjectId)(userId),
    });

    // 2. Get Razorpay config (adjust as per your config management)
    const config = {
      razor_pay_api_key: process.env.RAZORPAY_API_KEY,
      razor_pay_api_secret: process.env.RAZORPAY_API_SECRET,
    };

    // 3. Initiate Razorpay payment
    const instance = new Razorpay({
      key_id: config.razor_pay_api_key,
      key_secret: config.razor_pay_api_secret,
    });

    const options = {
      amount: orderAmount * 100,
      currency: 'INR',
      receipt: Array.isArray(orderData)
        ? orderData[0]._id.toString()
        : orderData._id.toString(),
      payment_capture: 1,
    };

    // 4. Create Razorpay order and update DB
    return new Promise((resolve, reject) => {
      instance.orders.create(options, async (err, order) => {
        if (err) {
          reject(err);
        } else {
          const orderId = Array.isArray(orderData)
            ? orderData[0]._id
            : orderData._id;
          await this._patch(orderId.toString(), {
            razorpayOrderId: order.id,
          });
          resolve(order);
        }
      });
    });
  }
}
