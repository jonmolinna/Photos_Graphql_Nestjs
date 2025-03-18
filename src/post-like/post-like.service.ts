import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostLike, PostLikeDocument } from './schema/post-like.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class PostLikeService {

    constructor(@InjectModel(PostLike.name) private postLikeModel: Model<PostLike>) {}

    async findAllLikesByPostId(postId: string | ObjectId): Promise<PostLikeDocument[]> {
        return await this.postLikeModel.find({post: postId})
    }

    async findOne(postId: ObjectId | string, userId: ObjectId | string): Promise<PostLikeDocument | null> {
        return await this.postLikeModel.findOne({post: postId, user: userId});
    }

    async likeOrUnlike(postId: ObjectId | string, userId: string | ObjectId): Promise<PostLikeDocument | null> {
        const like = await this.findOne(postId, userId);

        if (like) {
            return await this.postLikeModel.findOneAndDelete({ _id: like._id });
        }

        const newLike = new this.postLikeModel({ user: userId, post: postId });
        return await newLike.save();
    }

    async deleteManyLike(postId: string | ObjectId): Promise<boolean> {
        const likes = await this.postLikeModel.deleteMany({ post: postId });

        if (likes.acknowledged) {
            return true
        }

        return false
    }
}
