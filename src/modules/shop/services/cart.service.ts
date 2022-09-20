import { ICart, CartSchemaName, Cart } from './../models/cart.model';
import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';
import { CartDto } from '../dtos/cart.dto';

@Injectable()
export class CartService {
        
    constructor(@InjectModel(CartSchemaName) private readonly Cart:Model<ICart>){}

    @OnEvent("user.created",{async:true})
    createCart(id:string){
        const cart = new this.Cart();
        cart.user=id;
        cart.save();
    }

    async addToCart(cartDto: CartDto) {
        const cart = await this.Cart.findOne({user:cartDto.user});
        if(!cart){
            throw new NotFoundException("Cart not found")
        }
        const pIdx = cart.products.findIndex(item=>(item.product+'')==cartDto.product);
        if(pIdx>=0){
            cart.products[pIdx].quantity+=1;
        }else{
            cart.products.push({product:cartDto.product,quantity:1});
        }
        const cartResult = await cart.save();
        if(!cartResult){
            throw new ServiceUnavailableException('Failed to add to cart');
        }
        return "Added to cart successfully";
    }

    async fetchCart(id:string){
        const cart = await this.Cart.findOne({user:id}).populate("products.product").exec(); 
        if(!cart){
            throw new NotFoundException("Cart not found")
        }
        const cartResult = new Cart(cart);
        return cartResult;
    }

    async removeFromCart(cartDto: CartDto) {
        const cart = await this.Cart.findOne({user:cartDto.user});
        if(!cart){
            throw new NotFoundException("Cart not found")
        }
        cart.products=cart.products.filter(item=>(item.product+'')!==cartDto.product);
        const cartResult = await cart.save();
        if(!cartResult){
            throw new ServiceUnavailableException('Failed to remove from cart');
        }
        return "Removed from cart successfully";
    }

    

}
