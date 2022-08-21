import { CartDto } from './../dtos/cart.dto';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CartService } from '../services/cart.service';
import { response, Response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() cartDto: CartDto, @Res() response: Response) {
    try {
      const result = await this.cartService.addToCart(cartDto);
      response.json({
        statusCode: response.statusCode,
        data: result,
      });
    } catch (error) {
      response.statusCode = error.response.statusCode;
      response.json(error.response);
    }
  }

  @Get('fetchCart/:id')
  async fetchCart(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.cartService.fetchCart(id);
      response.json({
        statusCode: response.statusCode,
        data: result,
      });
    } catch (error) {
      response.statusCode = error.response.statusCode;
      response.json(error.response);
    }
  }

  @Post('remove')
  async removeCart(@Body() cartDto: CartDto, @Res() response: Response) {
    try {
      const result = await this.cartService.removeFromCart(cartDto);
      response.json({
        statusCode: response.statusCode,
        data: result,
      });
    } catch (error) {
      response.statusCode = error.response.statusCode;
      response.json(error.response);
    }
  }
}
