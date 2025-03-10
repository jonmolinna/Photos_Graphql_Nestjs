import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostLike, PostLikeDocument } from './schema/post-like.schema';
import { Model, ObjectId } from 'mongoose';
import { PostService } from 'src/post/post.service';

@Injectable()
export class PostLikeService {
    constructor(
        @InjectModel(PostLike.name) private postLikeModel: Model<PostLike>,
        private postService: PostService,
    ) {}

    async findOne(postId: ObjectId, userId: ObjectId | string): Promise<PostLikeDocument | null> {
        const postLike = this.postLikeModel.findOne({user: userId, post: postId});
        return postLike;
    }

    async likeOrUnlike(postId: ObjectId, userId: string | ObjectId): Promise<PostLikeDocument | null> {
        const post = await this.postService.findById(postId);
        
        if (!post) {
            return null;
        }

        const postLikeExist = await this.findOne(post.id, userId);

        if (postLikeExist) {
            const deletePostLike = await this.postLikeModel.findOneAndDelete(
                {_id: postLikeExist._id }
            )

            if (deletePostLike) {
                this.postService.deleteLikePost(deletePostLike);
            }

            return deletePostLike;
        }
        else {
            const createPostLike = new this.postLikeModel({ user: userId, post: post.id });
            const postLike = await createPostLike.save();
            this.postService.addLikePost(postLike);
            return postLike;
        }
    }
}
