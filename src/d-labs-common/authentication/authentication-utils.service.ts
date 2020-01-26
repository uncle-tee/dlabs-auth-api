import {Inject, Injectable} from '@nestjs/common';
import {compare, genSalt, hash} from 'bcryptjs';
import {Logger} from 'winston';

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
}
