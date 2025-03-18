import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreatePostInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese una publicación' })
    @MinLength(5, { message: "La publicación es demasiado corta" })
    @MaxLength(400, { message: "La publicación es demasiado largo" })
    comment: string
}