import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PostLike } from "src/post-like/schema/post-like.schema";
import { PostLikeType } from "src/post-like/type/post-like.type";
import { UserType } from "src/user/type/user.type";

@ObjectType()
export class PostType {
    @Field(() => ID)
    _id: string

    @Field(() => String)
    comment: string
   
    @Field(() => UserType)
    user: UserType

    @Field(() => [PostLikeType])
    likes: PostLikeType[]
   
    @Field(() => String)
    createdAt: Date
}