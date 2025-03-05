import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "../user.service";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyExist implements ValidatorConstraintInterface {
    constructor (private readonly userService: UserService) {}

    async validate(email: string, args?: ValidationArguments): Promise<boolean> {
        const user = await this.userService.findByEmail(email);
        return !user; // null igual true
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "El email ya esta registrado"
    }
}