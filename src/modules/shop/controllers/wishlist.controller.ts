import { WishlistService } from './../services/wishlist.service';
import { WishlistDto } from './../dtos/wishlist.dto';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('add')
  async addToWishlist(
    @Body() WishlistDto: WishlistDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.wishlistService.addToWishlist(WishlistDto);
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
  async removeWishlist(
    @Body() WishlistDto: WishlistDto,
    @Res() response: Response,
  ) {
    try {
      const result = await this.wishlistService.removeWishlist(WishlistDto);
      response.json({
        statusCode: response.statusCode,
        data: result,
      });
    } catch (error) {
      response.statusCode = error.response.statusCode;
      response.json(error.response);
    }
  }

  @Get('fethWishlist/:id')
  async fetchAll(@Param('id') id: string, @Res() response: Response) {
    try {
      const wishlist = await this.wishlistService.fetchWishlist(id);
      response.json({
        statusCode: response.statusCode,
        data: wishlist,
      });
    } catch (error) {
      response.statusCode = error.response.statusCode;
      response.json(error.response);
    }
  }
}
