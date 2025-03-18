import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";
import { CommentLikeType } from "src/comment-like/type/comment-like.type";
import { UserType } from "src/user/type/user.type";

@ObjectType()
export class CommentType {
    @Field(() => ID)
    _id: ObjectId

    @Field(() => String)
    comment: string
    
    @Field(() => String)
    createdAt: Date;
    
    @Field(() => UserType)
    user: UserType
    
    @Field(() => ID)
    post: ObjectId

    @Field(() => [CommentLikeType])
    likes: CommentLikeType[]
}