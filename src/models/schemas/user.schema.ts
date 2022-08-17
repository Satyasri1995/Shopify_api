import  { Schema, SchemaTypes } from 'mongoose';

export const UserSchema = new Schema({
  mail: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
  },
  isisAdmin:{
    type:SchemaTypes.Boolean,
    required:true,
    default:false,
  }
},{timestamps:true});

export const UserSchemaName = "user";

