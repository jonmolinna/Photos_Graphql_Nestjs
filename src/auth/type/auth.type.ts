import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthType {
    @Field(() => String)
    access_token: string
}