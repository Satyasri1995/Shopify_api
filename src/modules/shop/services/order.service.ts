import { IOrder, OrderSchemaName } from './../models/order.model';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
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
}
