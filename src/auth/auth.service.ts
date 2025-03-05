import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, pass: string): Promise<UserDocument | undefined> {
        const user = await this.usersService.findByEmail(email);

        if (user) {
            const isMath = await bcrypt.compare(pass, user.password);

            if (isMath) {
                return user;
            }

            null
        }

        null
    }

    async login(user: UserDocument): Promise<{access_token: string}> {
        const payload = { email: user.email, sub: user._id };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
