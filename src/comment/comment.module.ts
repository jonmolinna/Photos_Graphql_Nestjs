import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import { UserModule } from 'src/user/user.module';
import { CommentLikeModule } from 'src/comment-like/comment-like.module';

@Module({
  providers: [CommentService, CommentResolver],
  imports: [
    MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
    UserModule,
    CommentLikeModule,
  ],
  exports: [CommentService]
})
export class CommentModule {}
