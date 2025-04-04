import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common'
import { UserDocument } from 'src/user/schemas/user.schema';
// import { jwtConstants } from 'src/auth/constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private configService: ConfigService) {
        const jwtSecret = configService.get<string>('JWT_SECRET')

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: jwtConstants.secret
            secretOrKey: jwtSecret
        });
    }

    validate(payload: UserDocument) {
        return payload;
    }

}