import { IUser } from './../../../../models/interface/IUser';
import { UserSchemaName } from './../../../../models/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserSchemaName) private user:Model<IUser>){}

    async createUser(data:any){
        return ""
    }

}
