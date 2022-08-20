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
    async createProduct(@Body() createProductDto:CreateProductDto,@Res() response:Response){
        try {
            const productResult = await this.productService.createProduct(createProductDto);
            const result = await new Product(productResult);
            response.json({
                statusCode:response.statusCode,
                data:result
              })
            } catch (error) {
              response.statusCode=error.response.statusCode
              response.json(error.response)
            }
    }

    @Post("update")
    async updateProduct(@Body() productDto:ProductDto,@Res() response:Response){
      try {
        const productResult = await this.productService.updateProduct(productDto);
        const result = await new Product(productResult);
        response.json({
            statusCode:response.statusCode,
            data:result
          })
        } catch (error) {
          response.statusCode=error.response.statusCode
          response.json(error.response)
        }
    }

    @Get("fetchAll")
    async fetchAllProducts(@Res() response:Response){
      try {
        const result = await this.productService.findAllProducts();
        const products = result.map(product=>new Product(product));
        response.json({
          statusCode:response.statusCode,
          data:products
        })
      } catch (error) {
        response.statusCode=error.response.statusCode
        response.json(error.response)
      }
    }

    @Get("delete/:id")
    async deleteProduct(@Param('id') id:string,@Res() response:Response){
      try {
        const result = await this.productService.deleteProduct(id);
        response.json({
          statusCode:response.statusCode,
          data:result
        })
      } catch (error) {
        response.statusCode=error.response.statusCode
        response.json(error.response)
      }
    }


}
