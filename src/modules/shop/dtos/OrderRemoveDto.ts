import { IsMongoId } from "class-validator";

export class OrderRemoveDto{
    @IsMongoId()
    order:string;

    @IsMongoId()
    user:string;
}