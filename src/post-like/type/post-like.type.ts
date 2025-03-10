import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class PostLikeType {
    @Field(() => ID)
    _id: string
    
    @Field(() => ID)
    user: ObjectId

    @Field(() => ID)
    post: ObjectId
    
    @Field(() => String)
    createdAt: Date
}