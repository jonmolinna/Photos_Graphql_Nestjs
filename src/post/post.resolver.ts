import { Args, Mutation, Parent, ResolveField, Resolver, Query, ID } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './input/post-create,input';
import { PostType } from './type/post.type';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserType } from 'src/user/type/user.type';
import { UserService } from 'src/user/user.service';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/pipe/parse-object-id-pipe.pipe';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { CommentType } from 'src/comment/type/comment.type';
import { CommentService } from 'src/comment/comment.service';
import { PostLikeType } from 'src/post-like/type/post-like.type';
import { PostLikeService } from 'src/post-like/post-like.service';
import { CreateCommentInput } from 'src/comment/input/comment-create.input.type';

@Resolver(() => PostType)
@UsePipes(ValidationPipe)
export class PostResolver {
    constructor(
        private postService: PostService,
        private userService: UserService,
        private postLikeService: PostLikeService,
        private commentService: CommentService,
    ) {}

    // POSTS
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

    @Query(() => PostType, {nullable: true})
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
        const post = await this.postService.delete(postId, user.sub)
        
        if (post) {
            await this.postLikeService.deleteManyLike(post.id)
            await this.commentService.deleteManyComment(post.id);
        }

        return post;
    }

    // LIKE POST
    @Mutation(() => PostLikeType, { nullable: true })
    @UseGuards(JwtAuthGuard)
    async addLikeOrUnlikePost(
        @Args('postId', { type: () => ID }, ParseObjectIdPipe) postId: ObjectId,
        @CurrentUser() user: {email: string, sub: string},
    ) {
        const post = await this.postService.findById(postId);

        if (post) {
            return this.postLikeService.likeOrUnlike(post.id, user.sub);
        }

        return null;
    }

    // COMMENTS
    @Mutation(() => CommentType, { nullable: true })
    @UseGuards(JwtAuthGuard)
    async addComment(
        @Args('input') createCommentInput: CreateCommentInput,
        @CurrentUser() user: {email: string, sub: string}
    ) {
        const post = await this.postService.findById(createCommentInput.post);

        if (post) {
            return this.commentService.create({...createCommentInput, post: post.id }, user.sub)
        }

        return null;
    }

    // RESOLVEFIELD
    @ResolveField('user', () => UserType)
    async getUser(@Parent() post: PostType) {
        const { user } = post;
        return this.userService.findById(user._id);
    }

    @ResolveField('likes', () => [PostLikeType])
    async getLikes(@Parent() post: PostType) {
        const {_id} = post;
        return this.postLikeService.findAllLikesByPostId(_id)
    }

    @ResolveField('comments', () => [CommentType])
    async getComments(@Parent() post: PostType) {
        const {_id} = post;
        return this.commentService.findAllCommentsByPostId(_id)
    }
}
