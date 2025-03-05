import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ObjectId } from "mongoose";

@ObjectType()
export class MessageType {
    @Field(() => ID)
    _id: ObjectId

    @Field(() => String)
    message: string

    @Field(() => ID)
    from: ObjectId

    @Field(() => ID)
    to: ObjectId

    @Field(() => String)
    createdAt: Date
}