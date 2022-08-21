import { OrderDto } from './../dtos/order.dto';
import { IOrder, OrderSchemaName } from './../models/order.model';
import { Injectable, ServiceUnavailableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {
    constructor(@InjectModel(OrderSchemaName) private readonly Order:Model<IOrder>){}

    @OnEvent("user.created",{async:true})
    createOrder(id:string){
        const order = new this.Order();
        order.user=id;
        order.save();
    }

    async addOrder(data:OrderDto) {
        const order = await this.Order.findOne({user:data.user});
        if(!order){
            throw new NotFoundException("Order not found");
        }
        // const oIdx = order.products
    }
}
