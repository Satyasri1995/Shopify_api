import { IsMongoId } from "class-validator";

export class OrderDto{
    @IsMongoId()
    user:string;

    @IsMongoId()
    cart:string;

}