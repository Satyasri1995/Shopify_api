import { IUser } from './../../../../dist/modules/user/models/user.model.d';
import { ProductSchemaName, IProduct } from './../../product/models/product.model';
import { UserSchemaName } from './../../user/models/user.model';
import { SchemaTypes } from 'mongoose';
import { Schema } from 'mongoose';

export const CartSchema = new Schema({
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
      quantity:{
        type:SchemaTypes.Number,
        required:true
      }
    },
  ],
},{timestamps:true});

export const CartSchemaName = "cart";

export interface ICart{
    id:string;
    _id:string;
    user:string|IUser;
    items:{
        item:IProduct|string,
        quantity:number
    }[];
    createdAt:Date;
    updatedAt:Date;
}

export class Cart{
    id:string;
    user:string|IUser;
    items:{
        item:IProduct|string,
        quantity:number
    }[];
    createdAt:Date;
    updatedAt:Date;
    constructor(data:ICart){
        this.id=data.id||data._id;
        this.user=data.user;
        this.items=data.items;
        this.createdAt=data.createdAt;
        this.updatedAt=data.updatedAt;
    }
}


