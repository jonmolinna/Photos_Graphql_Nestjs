import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateCommentInput } from './input/comment-create.input.type';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<Comment>) {}

    async create(body: CreateCommentInput, user: ObjectId | string): Promise<CommentDocument> {
        const comment = new this.commentModel({...body, user: user });
        return comment.save();
    }

    async findAllCommentsByPostId(postId: ObjectId | string): Promise<CommentDocument[]> {
        return await this.commentModel.find({post: postId}).sort({ createdAt: -1 })
    }

    async findOne(commentId: ObjectId | string, userId: ObjectId | string): Promise<CommentDocument| null> {
        return await this.commentModel.findOne({_id: commentId, user: userId})
    }

    async findById(commentId: ObjectId | string): Promise<CommentDocument | null> {
        return await this.commentModel.findById(commentId);
    } 

    async delete(commentId: ObjectId | string, userId: ObjectId | string): Promise<CommentDocument | null> {
        const comment = await this.findOne(commentId, userId);

        if (comment) {
            return await this.commentModel.findByIdAndDelete(comment._id);
        }
        
        return null;
    }

    async deleteManyComment(postId: string | ObjectId): Promise<boolean> {
        const comments = await this.commentModel.deleteMany({ post: postId });

        if (comments.acknowledged) {
            return true
        }

        return false;
    }
}
