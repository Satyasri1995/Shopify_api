import { IProduct } from './../../product/models/product.model';
import { IUser, UserSchemaName } from './../../user/models/user.model';
import { SchemaTypes } from 'mongoose';
import { Schema } from 'mongoose';
import { ProductSchemaName } from './../../../modules/product/models/product.model';

export const OrderSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: UserSchemaName,
  },
  products: [
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
    },
  ],
  price:{
    type:SchemaTypes.Number,
    required:true,
    default:0
  }
},{timestamps:true});

export const OrderSchemaName = "order";

export interface IOrder{
    id:string;
    _id:string;
    user:string|IUser;
    products:{
        product:string|IProduct,
        quantity:number
    }[];
    price:number;
    createdAt:Date;
    updatedAt:Date;
}

export class Order{
    id:string;
    user:string|IUser;
    products:{
        product:string|IProduct,
        quantity:number
    }[];
    price:number;
    createdAt:Date;
    updatedAt:Date;
    constructor(data:IOrder){
        this.id=data.id||data._id;
        this.user=data.user;
        this.products=data.products;
        this.price=data.price;
        this.createdAt=data.createdAt;
        this.updatedAt=data.updatedAt;
    }
}

