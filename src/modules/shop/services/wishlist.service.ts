import { WishlistSchemaName, IWishlist } from './../models/wishlist.model';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(WishlistSchemaName)
    private readonly Wishlist: Model<IWishlist>,
  ) {}

  async createWishlist(id: string) {
    const wishlist = new this.Wishlist();
    wishlist.user = id;
    const wishlistResult = await wishlist.save();
    if(!wishlistResult){
        throw new ServiceUnavailableException("Failed to create wishlist");
    }
    return "Wishlist created successfully";
  }
}
