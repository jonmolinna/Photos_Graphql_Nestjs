import { Args, Mutation, Parent, ResolveField, Resolver, Query, ID } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './input/post-create,input';
import { PostType } from './type/post.type';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { UserType } from 'src/user/type/user.type';
import { UserService } from 'src/user/user.service';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/pipe/parse-object-id-pipe.pipe';

@Resolver(() => PostType)
@UsePipes(ValidationPipe)
export class PostResolver {
    constructor(
        private postService: PostService,
        private userService: UserService
    ) {}

    @Mutation(() => PostType)
    @UseGuards(JwtAuthGuard)
    async addPost(
        @Args('input') createPostInput: CreatePostInput,
        @CurrentUser() user: {email: string, sub: string}
    ) {
        return this.postService.create(createPostInput, user.sub);
    }

    @Query(() => [PostType])
    @UseGuards(JwtAuthGuard)
    async getPosts() {
        return this.postService.findAll();
    }

    @Query(() => PostType)
    @UseGuards(JwtAuthGuard)
    async getPost(@Args('id', { type: () => ID }, ParseObjectIdPipe) id: ObjectId) {
        return this.postService.findById(id);
    }

    @Mutation(() => PostType, {nullable: true })
    @UseGuards(JwtAuthGuard)
    async updatePost(
        @Args({name: 'postId', type: () => ID}, ParseObjectIdPipe) postId: ObjectId,
        @CurrentUser() user: {email: string, sub: string},
        @Args('input') createPostInput: CreatePostInput
    ) {
        return this.postService.update(postId, user.sub, createPostInput);
    }

    @Mutation(() => PostType, { nullable: true})
    @UseGuards(JwtAuthGuard)
    async deletePost(
        @Args({name: 'postId', type: () => ID}, ParseObjectIdPipe) postId: ObjectId,
        @CurrentUser() user: {email: string, sub: string},
    ) {
        return this.postService.delete(postId, user.sub)
    }

    @ResolveField('user', () => UserType)
    async getUser(@Parent() post: PostType) {
        const { user } = post;
        return this.userService.findById(user._id);
    }
}
