import { Field, ID, InputType } from "@nestjs/graphql";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

@InputType()
export class CreateMessageInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese un message' })
    message: string
    
    @Field(() => ID)
    @IsNotEmpty({ message: 'Ingrese un usuario' })
    @IsMongoId({ message: 'Ingrese un usuario valido'})
    to: ObjectId
}