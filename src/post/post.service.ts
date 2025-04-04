import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { Model, ObjectId } from 'mongoose';
import { CreatePostInput } from './input/post-create,input';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async create(body: CreatePostInput, userId: string): Promise<PostDocument> {
        const post = new this.postModel({comment: body.comment, user: userId});
        return post.save();
    }

    async findAll(): Promise<PostDocument[]> {
        return this.postModel.find().sort({ createdAt: -1 })
    }

    async findById(id: string | ObjectId): Promise<PostDocument | null> {
        return await this.postModel.findById(id);
    }

    async update(postId: ObjectId, userId: ObjectId | string, body: CreatePostInput): Promise<PostDocument | null> {
        const post = await this.postModel.findOneAndUpdate(
            { _id: postId, user: userId }, 
            {$set: {
                comment: body.comment
            }},
            { new: true }
        );

        return post;
    }

    async delete(postId: ObjectId, userId: ObjectId | string): Promise<PostDocument | null> {
        const post = await this.postModel.findOneAndDelete(
            { _id: postId, user: userId },
        );

        return post;
    }
}
