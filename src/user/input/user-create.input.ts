import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, Validate } from "class-validator";
import { IsEmailAlreadyExist } from "../validation/IsEmailAlreadyExist";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese un nombre' })
    name: String

    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese un email' })
    @IsEmail({}, { message: 'Email no válido'})
    @Validate(IsEmailAlreadyExist)
    email: string    

    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese una contraseña' })
    password: string
}