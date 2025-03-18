import { Field, ID, ObjectType } from "@nestjs/graphql";
import { CommentType } from "src/comment/type/comment.type";
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

    @Field(() => [CommentType])
    comments: CommentType[]
   
    @Field(() => String)
    createdAt: Date
}