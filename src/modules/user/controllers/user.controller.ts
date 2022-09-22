import { CreateUserDto, SignInUserDto, UserDto } from './../dtos/UserDto';
import { UserService } from '../services/user.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './../../../services/auth/auth.service';
import { User } from '../models/user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService,private auth:AuthService) {}

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

  @Post('signin')
  async signInUser(@Body() signInUserDto:SignInUserDto,@Res({passthrough:true}) response){
    const user:any = await this.userService.signInUser(signInUserDto);
    const jwToken = `Bearer ${this.auth.sign(user)}`;
    response.setHeader('Authorization', jwToken, {httpOnly: true});
    return {user,jwToken};
  }
}
