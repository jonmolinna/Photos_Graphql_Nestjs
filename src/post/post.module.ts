import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Post } from './schema/post.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [PostService, PostResolver],
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]), UserModule],
  exports: [PostService]
})
export class PostModule {}
