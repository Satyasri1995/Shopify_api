import { Schema, SchemaTypes } from "mongoose";

export class User {
    id: string;
    mail: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    isAdmin: boolean;
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
    mail:string;
    password:string;
    createdAt:string;
    updatedAt:string;
    isAdmin:boolean
}