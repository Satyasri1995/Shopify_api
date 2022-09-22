import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserSchemaName, UserSchema } from './models/user.model';
import { AuthService } from './../../services/auth/auth.service';

@Module({
  imports:[MongooseModule.forFeature([
    {name:UserSchemaName,schema:UserSchema}
  ])],
  controllers: [UserController],
  providers: [UserService,AuthService,JwtService],
})
export class UserModule {}
