import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MaxLength, MinLength, Validate } from "class-validator";
import { IsEmailAlreadyExist } from "../validation/IsEmailAlreadyExist";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese un nombre' })
    @MinLength(4, { message: "El nombre es demasiado corta" })
    @MaxLength(20, { message: "El nombre es demasiado largo" })
    name: String

    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese un email' })
    @IsEmail({}, { message: 'Email no válido'})
    @Validate(IsEmailAlreadyExist)
    email: string    

    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese una contraseña' })
    @MinLength(4, { message: "La contraseña es demasiado corta" })
    @MaxLength(20, { message: "La contraseña es demasiado largo" })
    password: string
}