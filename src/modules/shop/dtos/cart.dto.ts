import { IsMongoId } from "class-validator";

export class CartDto{
    @IsMongoId()
    user:string;

    @IsMongoId()
    product:string;
}