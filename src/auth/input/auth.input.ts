import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class AuthInput {
    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese un email' })
    @IsEmail({}, { message: 'Email no válido'})
    email: string

    @Field(() => String)
    @IsNotEmpty({ message: 'Ingrese una contraseña' })
    password: string
}