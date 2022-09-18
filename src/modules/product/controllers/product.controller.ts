import { ProductDto } from './../dtos/ProductDto';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from '../dtos/ProductDto';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';


@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService){}

    @Post("create")
    async createProduct(@Body() createProductDto:CreateProductDto){
      return await this.productService.createProduct(createProductDto);
    }

    @Post("update")
    async updateProduct(@Body() productDto:ProductDto){
      return await this.productService.updateProduct(productDto);
    }

    @Get("fetchAll")
    async fetchAllProducts(){
      return await this.productService.findAllProducts();
    }

    @Get("delete/:id")
    async deleteProduct(@Param('id') id:string){
      return await this.productService.deleteProduct(id);
    }


}
