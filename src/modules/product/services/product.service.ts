import { ProductDto } from './../dtos/ProductDto';
import { BadRequestException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dtos/ProductDto';
import { ProductSchemaName, IProduct, Product } from '../models/product.model';


@Injectable()
export class ProductService {
    
    constructor(@InjectModel(ProductSchemaName) private readonly Product:Model<IProduct>){}

    async createProduct(data:CreateProductDto){
        const productResult = await new this.Product({
            name:data.name,
            description:data.description,
            price:data.price,
            image:data.image
        }).save();
        if(!productResult){
            throw new ServiceUnavailableException("Failed to create the product");
        }
        return productResult;
    }

    async updateProduct(data:ProductDto){
        const product = await this.Product.findById(data.id);
        product.name=data.name;
        product.price=data.price;
        product.description=data.description;
        product.image=data.image;
        const productResult = await product.save();
        if(!productResult){
            throw new ServiceUnavailableException("Failed to update the product");
        }
        return "Product updated successfully";
    }

    async findAllProducts(){
        const rawProducts = await this.Product.find({});
        const products = rawProducts.map(product=>new Product(product));
        return products;
    }

    async deleteProduct(id: string) {
        if(!id){
            throw new BadRequestException("Invalid Product Id");
        }
        const result = await this.Product.findByIdAndDelete(id);
        if(!result){
            throw new ServiceUnavailableException("Failed to delete the product");
        }
        return "Product deleted successfully";
      }
}
