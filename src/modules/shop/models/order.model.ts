import { IProduct, Product } from './../../product/models/product.model';
import { IUser, UserSchemaName } from './../../user/models/user.model';
import mongoose, { SchemaTypes } from 'mongoose';
import { Schema } from 'mongoose';
import { ProductSchemaName } from './../../../modules/product/models/product.model';


export const OrderSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: UserSchemaName,
    },
    orders: [
      {
        _id:SchemaTypes.ObjectId,
        items:[
          {
            product: {
              type: SchemaTypes.ObjectId,
              required: true,
              ref: ProductSchemaName,
            },
            quantity: {
              type: SchemaTypes.Number,
              required: true,
            },
          }
        ],
        price: Number,
      },
    ],
    price: {
      type: SchemaTypes.Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

export const OrderSchemaName = 'order';

export interface IOrder {
  id: string;
  _id: string;
  user: string | IUser;
  orders: any[];
  createdAt: Date;
  updatedAt: Date;
}

export class Order {
  id: string;
  user: string | IUser;
  orders: any[];
  createdAt: Date;
  updatedAt: Date;
  constructor(data: IOrder) {
    this.id = data.id || data._id;
    this.user = data.user;
    this.orders = data.orders.map((order) => ({
      id:order._id||order.id,
      items: order.items.map((oitem) => ({
        product: new Product(oitem.product),
        quantity: oitem.quantity,
      })),
      price: order.price,
    }))||[];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
