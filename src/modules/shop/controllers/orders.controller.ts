import { OrderDto } from './../dtos/order.dto';
import { OrderService } from './../services/order.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add')
  async addOrder(@Body() orderDto: OrderDto) {
    return await this.orderService.addOrder(orderDto);
  }

  @Get('fetchCart/:id')
  async fetchCart(@Param('id') id: string) {
    return await this.orderService.fetchOrder(id);
  }

  @Post('remove')
  async removeOrder(@Body() orderDto: OrderDto) {
    return await this.orderService.removeOrder(orderDto);
  }
}
