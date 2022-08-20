import { IProduct } from './../../product/models/product.model';
import { IUser } from './../../../../dist/modules/user/models/user.model.d';
import { UserSchemaName } from './../../user/models/user.model';
import { SchemaTypes } from 'mongoose';
import { Schema } from 'mongoose';
import { ProductSchemaName } from './../../../modules/product/models/product.model';

export const OrderSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: UserSchemaName,
  },
  items: [
    {
      item: {
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
    required:true
  }
},{timestamps:true});

export const OrderSchemaName = "order";

export interface IOrder{
    id:string;
    _id:string;
    user:string|IUser;
    items:{
        item:string|IProduct,
        quantity:number
    }[];
    price:number;
    createdAt:Date;
    updatedAt:Date;
}

export class Order{
    id:string;
    user:string|IUser;
    items:{
        item:string|IProduct,
        quantity:number
    }[];
    price:number;
    createdAt:Date;
    updatedAt:Date;
    constructor(data:IOrder){
        this.id=data.id||data._id;
        this.user=data.user;
        this.items=data.items;
        this.price=data.price;
        this.createdAt=data.createdAt;
        this.updatedAt=data.updatedAt;
    }
}

