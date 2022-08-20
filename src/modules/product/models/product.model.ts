import { Schema, SchemaTypes } from 'mongoose';


export const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:SchemaTypes.Number,
        required:true
    },
    description:{
        type:String,
        required:true,
    }
},{timestamps:true});

export const ProductSchemaName="product";

export interface IProduct{
    name:string;
    description:string;
    price:number;
    image:string
    id:string;
    _id:string;
    createdAt:Date;
    updatedAt:Date;
}

export class Product{
    id:string
    name:string;
    description:string;
    price:number;
    image:string;
    createdAt:Date;
    updatedAt:Date;
    constructor(data:IProduct){
        this.id=data._id||data.id;
        this.name=data.name;
        this.description=data.description;
        this.price=data.price;
        this.image=data.image;
        this.createdAt=data.createdAt;
        this.updatedAt=data.updatedAt
    }
}

