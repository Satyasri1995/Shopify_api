import { Schema, SchemaTypes } from "mongoose";

export class User {
    id: string;
    mail: string;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;

    constructor(data:IUser){
      this.id=data._id||data.id;
      this.mail=data.mail;
      this.createdAt=data.createdAt;
      this.updatedAt=data.updatedAt;
      this.isAdmin=data.isAdmin;
    }
  }
  
  export const UserSchema = new Schema({
    mail: {
      type: String,
      required: true,
    },
    password:{
      type:String,
      required:true,
    },
    isAdmin:{
      type:SchemaTypes.Boolean,
      required:true
    }
  },{timestamps:true});
  
  export const UserSchemaName = "user";

  export interface IUser{
    id:string;
    _id:string;
    mail:string;
    createdAt:Date;
    updatedAt:Date;
    isAdmin:boolean
}