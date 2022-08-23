import { WishlistService } from './../services/wishlist.service';
import { WishlistDto } from './../dtos/wishlist.dto';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('add')
  async addToWishlist(@Body() WishlistDto: WishlistDto) {
    return await this.wishlistService.addToWishlist(WishlistDto);
  }

  @Post('remove')
  async removeWishlist(@Body() WishlistDto: WishlistDto) {
    return await this.wishlistService.removeWishlist(WishlistDto);
  }

  @Get('fethWishlist/:id')
  async fetchAll(@Param('id') id: string) {
    return await this.wishlistService.fetchWishlist(id);
  }
}
