import { Resolver, Mutation, Args, ResolveField, Parent, ID, Query } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentType } from './type/comment.type';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserType } from 'src/user/type/user.type';
import { UserService } from 'src/user/user.service';
import { ParseObjectIdPipe } from 'src/pipe/parse-object-id-pipe.pipe';
import { ObjectId } from 'mongoose';
import { CommentLikeService } from 'src/comment-like/comment-like.service';
import { CommentLikeType } from 'src/comment-like/type/comment-like.type';
@Resolver(() => CommentType)
export class CommentResolver {
    constructor(
        private commentService: CommentService,
        private userService: UserService,
        private commentLikeService: CommentLikeService,
    ) {}

    @Query(() => [CommentType], { nullable: true })
    @UseGuards(JwtAuthGuard)
    async getComments(
        @Args("postId", { type: () => ID }, ParseObjectIdPipe) postId: ObjectId,
    ) {
        return await this.commentService.findAllCommentsByPostId(postId);
    }

    @Mutation(() => CommentType, {nullable: true})
    @UseGuards(JwtAuthGuard)
    async deleteComment(
        @Args({name: 'commentId', type: () => ID}, ParseObjectIdPipe) commentId: ObjectId,
        @CurrentUser() user: {email: string, sub: string},
    ) {
        return await this.commentService.delete(commentId, user.sub);
    }

    // LIKE COMMENT
    @Mutation(() => CommentLikeType, { nullable: true })
    @UseGuards(JwtAuthGuard)
    async addLikeOrUnlikeComment(
        @Args("commentId", { type: () => ID }, ParseObjectIdPipe) commentId: ObjectId,
        @CurrentUser() user: {email: string, sub: string},
    ) {
        const comment = await this.commentService.findById(commentId);

        if (comment) {
            return this.commentLikeService.likeOrUnlike(comment.id, user.sub);
        }

        return null;
    }

    // ResolveField
    @ResolveField('user', () => UserType)
    async getUser(@Parent() comment: CommentType) {
        const {user} =  comment;
        return this.userService.findById(user._id)
    }

    @ResolveField('likes', () => [CommentLikeType])
    async getLikes(@Parent() comment: CommentType) {
        const { _id } = comment;
        return this.commentLikeService.findAllLikesByCommentId(_id)
    }
}
