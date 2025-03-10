import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { PostLikeService } from './post-like.service';
import { PostLikeType } from './type/post-like.type';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/pipe/parse-object-id-pipe.pipe';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver()
export class PostLikeResolver {
    constructor(private postLikeService: PostLikeService) {}

    @Mutation(() => PostLikeType, { nullable: true })
    @UseGuards(JwtAuthGuard)
    async addLikeOrDeleteLike(
        @Args('postId', { type: () => ID }, ParseObjectIdPipe) postId: ObjectId,
         @CurrentUser() user: {email: string, sub: string},
    ) {
        return this.postLikeService.likeOrUnlike(postId, user.sub);
    }
}
