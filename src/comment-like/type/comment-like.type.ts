import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class CommentLikeType {
    @Field(() => ID)
    _id: string

    @Field(() => ID)
    user: ObjectId
    
    @Field(() => ID)
    comment: ObjectId

    @Field(() => String)
    createdAt: Date
}