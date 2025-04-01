import {InputType, Field, ID} from "@nestjs/graphql"
import { IsMongoId, IsNotEmpty, MaxLength, MinLength } from "class-validator"
import { ObjectId } from "mongoose"

@InputType()
export class CreateCommentInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese un comentario' })
    @MinLength(5, { message: "El comentario es demasiado corta" })
    @MaxLength(50, { message: "El comentario es demasiado largo" })
    comment: string

    @Field(() => ID)
    @IsMongoId()
    post: ObjectId
}