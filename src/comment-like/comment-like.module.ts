import { Module } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeResolver } from './comment-like.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentLike, CommentLikeSchema } from './schema/comment-like.schema';

@Module({
  providers: [CommentLikeService, CommentLikeResolver],
  imports: [MongooseModule.forFeature([{ name: CommentLike.name, schema: CommentLikeSchema}])],
  exports: [CommentLikeService]
})
export class CommentLikeModule {}
