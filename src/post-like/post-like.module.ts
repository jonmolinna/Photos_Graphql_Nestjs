import { Module } from '@nestjs/common';
import { PostLikeResolver } from './post-like.resolver';
import { PostLikeService } from './post-like.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostLike, PostLikeSchema } from './schema/post-like.schema';

@Module({
  providers: [PostLikeResolver, PostLikeService],
  imports: [
    MongooseModule.forFeature([{ name: PostLike.name, schema: PostLikeSchema }]),
  ],
  exports: [PostLikeService],
})
export class PostLikeModule {}
