import { IOrder, OrderSchemaName } from './../models/order.model';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
    constructor(@InjectModel(OrderSchemaName) private readonly Order:Model<IOrder>){}

    async createOrder(id:string){
        const order = new this.Order();
        order.user=id;
        const orderResult = await order.save();
        if(!orderResult){
            throw new ServiceUnavailableException("Failed to create Order");
        }
        return "Order created successfully";
    }
}
