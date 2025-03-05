import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {
    @Field(() => ID)
    _id: string

    @Field(() => String)
    name: string

    @Field(() => String)
    email: string

    @Field(() => String)
    createdAt: Date
}