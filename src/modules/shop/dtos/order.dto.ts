import { Optional } from "@nestjs/common";
import { IsMongoId } from "class-validator";

export class OrderDto{
    @IsMongoId()
    user:string;

    @IsMongoId()
    cart:string;

    @IsMongoId()
    @Optional()
    product:string;

}