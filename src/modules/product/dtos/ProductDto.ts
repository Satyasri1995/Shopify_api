import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateProductDto{

    @IsString()
    name:string;

    @IsString()
    description:string;

    @IsNumber()
    price:number;

    @IsString()
    image:string;
}

export class ProductDto{

    @IsMongoId()
    id:string;

    @IsString()
    name:string;

    @IsString()
    description:string;

    @IsNumber()
    price:number;

    @IsString()
    image:string;
}