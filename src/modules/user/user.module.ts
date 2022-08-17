import { UserSchema, UserSchemaName } from './../../models/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
  imports:[MongooseModule.forFeature([
    {name:UserSchemaName,schema:UserSchema}
  ])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
