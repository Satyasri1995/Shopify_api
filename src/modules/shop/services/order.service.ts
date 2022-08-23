import { Cart, CartSchemaName, ICart } from './../models/cart.model';
import { OrderDto } from './../dtos/order.dto';
import { IOrder, Order, OrderSchemaName } from './../models/order.model';
import {
  Injectable,
  ServiceUnavailableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const order = await this.Order.findOne({ user: id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const orderResult = new Order(order);
    return orderResult;
  }

  async addOrder(data: OrderDto) {
    const order = await this.Order.findOne({ user: data.user });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const cart = await this.Cart.findById(data.cart)
      .populate('products.product')
      .exec();
    const cartResult = new Cart(cart);
    const totalPrice = cartResult.products.reduce((total, currentValue) => {
      const product: any = currentValue.product;
      return total + product.price;
    }, 0);
    order.price = totalPrice;
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

  async removeOrder(data: OrderDto) {
    const order = await this.Order.findOne({ user: data.user });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const cart = await this.Cart.findById(data.cart);
    const product = order.products.find((products) => products.product==data.product);
    const pIdx = cart.products.findIndex(products=>products.product==data.product);
    if(pIdx>=0){
        cart.products[pIdx].quantity+=product.quantity;
    }else{
        cart.products.push(product);
    }
    order.products = order.products.filter((products) => products.product==data.product);
    const orderResult = await order.save();
    if(!orderResult){
        throw new ServiceUnavailableException("Failed to update Orders");
    }
    const cartResult = await cart.save();
    if(!cartResult){
        throw new ServiceUnavailableException("Failed to update Cart");
    }
    return "Order ccancelled successfully"
  }
}
