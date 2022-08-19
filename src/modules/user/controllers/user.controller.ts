import { UserService } from '../services/user.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dtos';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto,@Res() response):Promise<void> {
    let result: string;
    try {
      result = await this.userService.createUser(createUserDto);
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
