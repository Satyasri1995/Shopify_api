import { ICart, CartSchemaName } from './../models/cart.model';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CartService {
    constructor(@InjectModel(CartSchemaName) private readonly Cart:Model<ICart>){}

    @OnEvent("user.created",{async:true})
    createCart(id:string){
        const cart = new this.Cart();
        cart.user=id;
        cart.save();
    }
}
