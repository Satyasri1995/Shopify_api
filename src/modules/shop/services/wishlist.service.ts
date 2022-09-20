import { WishlistDto } from './../dtos/wishlist.dto';
import { WishlistSchemaName, IWishlist, Wishlist } from './../models/wishlist.model';
import { ConflictException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(WishlistSchemaName)
    private readonly Wishlist: Model<IWishlist>,
  ) {}

  @OnEvent("user.created",{async:true})
  createWishlist(id: string) {
    const wishlist = new this.Wishlist();
    wishlist.user = id;
   wishlist.save();
  }

  async fetchWishlist(id:string){
    const wishlist = await this.Wishlist.findOne({user:id}).populate("products").exec();
    if(!wishlist){
      throw new NotFoundException("favorite list not found");
    }
    const WishlistResult =  new Wishlist(wishlist);
    return WishlistResult;
  }

  async addToWishlist(data:WishlistDto){
    const wishlist = await  this.Wishlist.findOne({user:data.user});
    if(!wishlist){
      throw new NotFoundException("favorite list not found");
    }
    const idx = wishlist.products.findIndex(product=>(product+'')===data.product);
    if(idx>=0){
      throw new ConflictException('Product already wishlisted');
    }
    wishlist.products.push(data.product);
    const wishResult = await wishlist.save();
    if(!wishResult){
      throw new ServiceUnavailableException("Failed to wishlist");
    }
    return "favorites successfully";
  }

  async removeWishlist(data:WishlistDto){
    const wishlist = await  this.Wishlist.findOne({user:data.user});
    if(!wishlist){
      throw new NotFoundException("Wishlist not found");
    }
    wishlist.products=wishlist.products.filter(product=>(product+'')!==data.product);
    const wishResult = await wishlist.save();
    if(!wishResult){
      throw new ServiceUnavailableException("Failed to remove wishlist");
    }
    return "removed from favorites successfully";
  }

}
