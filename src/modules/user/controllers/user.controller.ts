import { CreateUserDto, UserDto } from './../dtos/UserDto';
import { UserService } from '../services/user.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../models/user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto,@Res() response:Response):Promise<void> {
    
    try {
      const result = await this.userService.createUser(createUserDto);
      response.json({
        statusCode:response.statusCode,
        data:result
      })
    } catch (error) {
      response.statusCode=error.response.statusCode
      response.json(error.response)
    }
  }

  @Post('update')
  async updateUser(@Body() userDto:UserDto,@Res() response:Response):Promise<void>{
    try {
      const updatedUser = await this.userService.updateUser(userDto);
      const result = new User(updatedUser);
      response.json({
        statusCode:response.statusCode,
        data:result
      })
    } catch (error) {
      response.statusCode=error.response.statusCode
      response.json(error.response)
    }
  }

  @Get("fetchAll")
  async fetchAllUsers(@Res() response:Response){
    try {
      const users = await this.userService.fetchAllUsers();
      response.json({
        statusCode:response.statusCode,
        data:users
      })
    } catch (error) {
      response.statusCode=error.response.statusCode
      response.json(error.response)
    }
  }

  @Post('delete/:id')
  async deleteUser(@Param('id') id:string,@Res() response:Response){
    try {
      const result = await this.userService.deleteUser(id);
      response.json({
        statusCode:response.statusCode,
        data:result
      })
    } catch (error) {
      response.statusCode=error.response.statusCode
      response.json(error.response)
    }
  }
}
