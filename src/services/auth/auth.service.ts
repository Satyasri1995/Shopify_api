import {  User } from './../../modules/user/models/user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    sign(user:any){
        const jwt = this.jwtService.sign({...user},{
            expiresIn:process.env.JWT_EXPIRES_IN,
            secret:process.env.JWT_SECRET
        });
        return jwt;
    }

    verify(token:string){
       const jwtVerify = this.jwtService.verify(token,{
        secret:process.env.JWT_SECRET
    });
       return jwtVerify;
    }

    decode(token:string){
        const jwtDecode = this.jwtService.decode(token);
    }

}