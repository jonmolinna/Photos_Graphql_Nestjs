import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentLike, CommentLikeDocument } from './schema/comment-like.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class CommentLikeService {
    constructor(@InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLike>) {}

    async findOne(commentId: ObjectId | string, userId: ObjectId | string): Promise<CommentLikeDocument | null> {
        return await this.commentLikeModel.findOne({comment: commentId, user: userId });
    }

    async findAllLikesByCommentId(commentId: string | ObjectId): Promise<CommentLikeDocument[]> {
        return await this.commentLikeModel.find({ comment: commentId })
    }

    async likeOrUnlike(commentId: string | ObjectId, userId: string | ObjectId): Promise<CommentLikeDocument | null> {
        const like = await this.findOne(commentId, userId);

        if (like) {
            return await this.commentLikeModel.findOneAndDelete({ _id: like._id });
        }

        const newLike = new this.commentLikeModel({ user: userId, comment: commentId });
        return await newLike.save();
    }
}
