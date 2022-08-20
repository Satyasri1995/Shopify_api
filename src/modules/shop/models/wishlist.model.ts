import { IProduct } from './../../product/models/product.model';
import { IUser } from './../../user/models/user.model';
import { ProductSchemaName } from '../../product/models/product.model';
import { UserSchemaName } from '../../user/models/user.model';
import { SchemaTypes } from 'mongoose';
import { Schema } from 'mongoose';


export const WishlistSchema = new Schema({
    user:{
        type:SchemaTypes.ObjectId,
        required:true,
        ref:UserSchemaName
    },
    products:[
        {
            type:SchemaTypes.ObjectId,
            required:true,
            ref:ProductSchemaName
        }
    ]
},{timestamps:true});

export const WishlistSchemaName = "wishlist";

export interface IWishlist{
    id:string;
    _id:string;
    user:string|IUser;
    products:(string|IProduct)[];
    createdAt:Date;
    updatedAt:Date;
}

export class Wishlist{
    id:string;
    user:string|IUser;
    products:(string|IProduct)[];
    createdAt:Date;
    updatedAt:Date;
    constructor(data:IWishlist){
        this.id=data._id||data.id;
        this.user=data.user;
        this.products=data.products;
        this.createdAt=data.createdAt;
        this.updatedAt=data.updatedAt;
    }
}