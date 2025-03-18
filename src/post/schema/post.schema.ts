import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { PostLike } from "src/post-like/schema/post-like.schema";
import { User } from "src/user/schemas/user.schema";

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
    @Prop({ type: String })
    comment: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({ default: Date.now })
    createdAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post);