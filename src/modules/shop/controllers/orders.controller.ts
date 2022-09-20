import { OrderRemoveDto } from './../dtos/OrderRemoveDto';

import { OrderService } from './../services/order.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get('add/:id')
  async addOrder(@Param('id') id:string ) {
    return await this.orderService.addOrder(id);
  }

  @Get('fetchCart/:id')
  async fetchCart(@Param('id') id: string) {
    return await this.orderService.fetchOrder(id);
  }

  @Post('remove')
  async removeOrder(@Body() data:OrderRemoveDto) {
    return await this.orderService.removeOrder(data);
  }
}
