import { UserService } from './../../services/user/user.service';
import { CreateUserDto } from './../../../../models/dtos/create.validator.dtos';
import { Body, Controller,  Post } from '@nestjs/common';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Post("signup")
    async createUser(@Body() createUserDto:CreateUserDto):Promise<string>{

        return this.userService.createUser(createUserDto);
    }
}
