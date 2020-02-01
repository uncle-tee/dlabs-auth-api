import {Inject, Injectable} from '@nestjs/common';
import {compare, genSalt, hash} from 'bcryptjs';
import {Logger} from 'winston';
import {sign} from 'jsonwebtoken';

@Injectable()
export class AuthenticationUtils {

    constructor(@Inject('winston') private readonly logger: Logger) {
    }

    public hashPassword(password: string): Promise<string> {
        return genSalt(Number(process.env.SALT_ROUNDS)).then((salt: string) => {
            return hash(password, salt);
        });
    }

    public comparePassword(password: string, hashedPassword: string) {
        return compare(password, hashedPassword);
    }

    public generateToken(userId: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const token: string = sign({sub: userId}, process.env.AUTH_SECRET, {
                issuer: process.env.PROJECT_NAME,
                expiresIn: process.env.Token_EXPIRATION
            });
            if (token) {
                return resolve(token);
            } else {
                reject('Token cannot be generated');
            }
        });

    }
}
