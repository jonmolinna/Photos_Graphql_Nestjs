import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Comment } from "src/comment/schema/comment.schema";
import { User } from "src/user/schemas/user.schema";

export type CommentLikeDocument = HydratedDocument<CommentLike>;

@Schema()
export class CommentLike {
    @Prop({ default: Date.now })
    createdAt: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'})
    comment: Comment
}

export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike);