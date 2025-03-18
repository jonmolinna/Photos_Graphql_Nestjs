import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Post } from "src/post/schema/post.schema";
import { User } from "src/user/schemas/user.schema";

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
    @Prop()
    comment: string

    @Prop({type: Date, default: Date.now})
    createdAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post'})
    post: Post
}

export const CommentSchema = SchemaFactory.createForClass(Comment);