import { OrderRemoveDto } from './../dtos/OrderRemoveDto';
import { Cart, CartSchemaName, ICart } from './../models/cart.model';
import { IOrder, Order, OrderSchemaName } from './../models/order.model';
import {
  Injectable,
  ServiceUnavailableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(OrderSchemaName) private readonly Order: Model<IOrder>,
    @InjectModel(CartSchemaName) private readonly Cart: Model<ICart>,
  ) {}

  @OnEvent('user.created', { async: true })
  createOrder(id: string) {
    const order = new this.Order();
    order.user = id;
    order.save();
  }

  async fetchOrder(id: string) {
    const order = await this.Order.findOne({ user: id }).populate("orders.items.product").exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const orderResult = new Order(order);
    return orderResult;
  }

  async addOrder(id:string) {
    const order = await this.Order.findOne({ user: id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const cart = await this.Cart.findOne({user:id}).populate("products.product").exec();
    const cartResult = new Cart(cart);
    const totalPrice = cartResult.products.reduce((total, currentValue) => {
      const product: any = currentValue.product;
      return total + product.price*currentValue.quantity;
    }, 0);
    const objId=new mongoose.Types.ObjectId();
    order.orders.push({
      _id:objId,
      items:cartResult.products.map((item)=>({product:item.product.id,quantity:item.quantity})),
      price:totalPrice
    });
    const orderResult = await order.save();
    if (!orderResult) {
      throw new ServiceUnavailableException('Failed to place order');
    }
    cart.products = [];
    const cartResult2 = await cart.save();
    if (!cartResult2) {
      throw new ServiceUnavailableException('Failed to update cart');
    }
    return 'Order placed successfully';
  }

  async removeOrder(data:OrderRemoveDto) {
    const order = await this.Order.findOne({ user: data.user});
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.orders=order.orders.filter(orderitem=>orderitem._id+""!==data.order);
    const orderResult = await order.save();
    if(!orderResult){
        throw new ServiceUnavailableException("Failed to update Orders");
    }
    return "Order cancelled successfully"
  }
}
