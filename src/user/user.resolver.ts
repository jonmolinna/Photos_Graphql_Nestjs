import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from './type/user.type';
import { CreateUserInput } from './input/user-create.input';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/pipe/parse-object-id-pipe.pipe';

@Resolver()
@UsePipes(ValidationPipe)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Mutation(() => UserType)
    async addUser(@Args('input') body: CreateUserInput) {
        return this.userService.create(body)
    }

    @Query(() => [UserType])
    @UseGuards(JwtAuthGuard)
    async getUsers(@CurrentUser() user: {email: string, sub: string, iat: number, exp: number}) {
        return this.userService.findAll(user.sub);
    }

    @Query(() => UserType)
    @UseGuards(JwtAuthGuard)
    async getUser(@Args('id', { type: () => ID}, ParseObjectIdPipe) id: ObjectId) {
        return this.userService.findById(id);
    }
}
