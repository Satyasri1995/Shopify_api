import { CreateUserDto } from '../dtos/createUser.dtos';
import { ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crypto } from 'src/utils/crypto';
import { IUser, UserSchemaName } from 'src/modules/user/models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserSchemaName) private User:Model<IUser>){}

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
            throw new ServiceUnavailableException();
        }
        return "User created successfully";
    }

}
