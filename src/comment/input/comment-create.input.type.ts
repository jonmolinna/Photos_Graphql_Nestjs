import {InputType, Field, ID} from "@nestjs/graphql"
import { ObjectId } from "mongoose"

@InputType()
export class CreateCommentInput {
    @Field(() => String)
    comment: string

    @Field(() => ID)
    post: ObjectId
}