import { CreateUserDto, UserDto } from './../dtos/UserDto';
import { UserService } from '../services/user.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../models/user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto){
    return await this.userService.createUser(createUserDto);
  }

  @Post('update')
  async updateUser(@Body() userDto:UserDto){
    return await this.userService.updateUser(userDto);
  }

  @Get("fetchAll")
  async fetchAllUsers(){
    return await this.userService.fetchAllUsers();
  }

  @Post('delete/:id')
  async deleteUser(@Param('id') id:string){
    return await this.userService.deleteUser(id);
  }
}
