import { OrderDto } from './../dtos/order.dto';
import { OrderService } from './../services/order.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add')
  async addOrder(@Body() orderDto: OrderDto, @Res() response: Response) {
    try {
      const result = await this.orderService.addOrder(orderDto);
      response.json({
        statusCode: response.statusCode,
        data: result,
      });
    } catch (error) {
      response.statusCode = error.response.statusCode;
      response.json(error.response);
    }
  }

  @Get('fetchCart/:id')
  async fetchCart(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.orderService.fetchOrder(id);
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
  async removeOrder(@Body() orderDto: OrderDto, @Res() response: Response) {
    try {
      const result = await this.orderService.removeOrder(orderDto);
      response.json({
        statusCode: response.statusCode,
        data: result,
      });
    } catch (error) {
      response.statusCode = error.response.statusCode;
      response.json(error.response);
    }
  }
}
