import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Post } from "src/post/schema/post.schema";
import { User } from "src/user/schemas/user.schema";

export type PostLikeDocument = HydratedDocument<PostLike>;

@Schema()
export class PostLike {
    @Prop({ default: Date.now })
    createdAt: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post'})
    post: Post
}

export const PostLikeSchema = SchemaFactory.createForClass(PostLike);