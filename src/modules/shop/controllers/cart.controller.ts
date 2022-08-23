import { CartDto } from './../dtos/cart.dto';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CartService } from '../services/cart.service';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(@Body() cartDto: CartDto) {
    return await this.cartService.addToCart(cartDto);
  }

  @Get('fetchCart/:id')
  async fetchCart(@Param('id') id: string) {
    return await this.cartService.fetchCart(id);
  }

  @Post('remove')
  async removeCart(@Body() cartDto: CartDto) {
    return await this.cartService.removeFromCart(cartDto);
  }
}
