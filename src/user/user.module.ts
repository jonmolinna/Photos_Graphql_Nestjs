import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { IsEmailAlreadyExist } from './validation/IsEmailAlreadyExist';

@Module({
  providers: [UserService, UserResolver, IsEmailAlreadyExist],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UserService]
})
export class UserModule {}
