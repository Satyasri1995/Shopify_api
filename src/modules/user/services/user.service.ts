
import { ConflictException, Injectable, NotFoundException, ServiceUnavailableException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Document } from 'mongoose';
import { Crypto } from 'src/utils/crypto';
import { IUser, User, UserSchemaName } from 'src/modules/user/models/user.model';
import { CreateUserDto, UserDto } from '../dtos/UserDto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserSchemaName) private User:Model<IUser>,private readonly event:EventEmitter2){}

    async createUser(data:CreateUserDto){
        const exist = await this.User.exists({mail:data.mail});
        if(exist){
            throw new ConflictException("User already exists");
        }
        const encryptedPassword = await new Crypto().encryptPassword(data.password);
        const user = new this.User({
            mail:data.mail,
            password:encryptedPassword,
            isAdmin:data.isAdmin
        });
        const createdUser = await user.save();
        if(!createdUser){
            throw new ServiceUnavailableException("Failed to create the user");
        }
        this.event.emit(["order.create","wishlist.create","cart.create"],{id:createdUser._id});
        return "User created successfully";
    }

    async updateUser(data:UserDto){
        const user = await this.User.findById(data.id);
        if(!user){
            throw new NotFoundException("User not Found");
        }
        user.mail=data.mail;
        user.isAdmin=data.isAdmin;
        const updatedUser = await user.save();
        return updatedUser;
    }

    async fetchAllUsers(){
        const result = await this.User.find({});
        if(!result){
            throw new ServiceUnavailableException('Failed to fetch users');
        }
        const users = result.map((user)=>new User(user));
        return users;
    }

    async deleteUser(id:string){
        if(!id){
            throw new BadRequestException("Invalid user ID");
        }   
        const result = await this.User.findByIdAndDelete(id);
        if(!result){
            throw new ServiceUnavailableException('Failed to delete user');
        }
        return 'User deleted successfully';
    }

    

}
