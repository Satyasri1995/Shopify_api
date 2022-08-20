import { IsMongoId } from "class-validator";

export class WishlistDto{
    @IsMongoId()
    user:string;

    @IsMongoId()
    product:string;
}