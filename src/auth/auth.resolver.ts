import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './input/auth.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guard/gql-auth.guard';
import { AuthType } from './type/auth.type';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { UserType } from 'src/user/type/user.type';
import { UserService } from 'src/user/user.service';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService, private userService: UserService) {}

    @Mutation(() => AuthType)
    @UseGuards(GqlAuthGuard)
    async login(
        @Args('loginUserInput') input: AuthInput,
        @Context() context,
    ) {
        return this.authService.login(context.user);
    }

    @Query(() => UserType)
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: {email: string, sub: string, iat: number, exp: number}) {
        return this.userService.findById(user.sub);
    }
}
