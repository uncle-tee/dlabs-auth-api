import {Inject, Injectable} from '@nestjs/common';
import {AuthenticationUtils} from '../d-labs-common/authentication-utils.service';
import {verify, VerifyCallback, VerifyErrors} from 'jsonwebtoken';
import {Request} from 'express';
import {Connection} from 'typeorm';

@Injectable()
export class AuthenticationService {

    constructor(private readonly authenticationUtils: AuthenticationUtils,
                private readonly connection: Connection) {
    }

    public verifyIncomingRequest(req: Request) {
        return new Promise((resolve, reject) => {
            const tokenProvided = this.verifyRequest(req, (err: VerifyErrors, decoded: object | string) => {
                if (err) {
                    if (err instanceof SyntaxError) {
                        reject('Token is invalid');
                    } else {
                        reject(err);
                    }

                }
                if (decoded) {
                    resolve(decoded);
                }
            });
            if (!tokenProvided) {
                reject('Authorisation token is required');
            }
        });
    }

    public signUpUser(userDto: UserDto) {
        return this.connection.transaction((async (entityManager) => {
            const portalUser = new PortalUser();
            portalUser.name = userDto.name;
            portalUser.password = await this.authenticationUtils.hashPassword(userDto.password.toLowerCase());
            portalUser.userName = userDto.userName.toLowerCase();
            return entityManager.getCustomRepository(UserRepository).save(portalUser);
        }));
    }

    public loginUser(loginDto: LoginDto) {
        return this.connection.getCustomRepository(UserRepository).findOne({
            where: {userName: loginDto.userName, status: GenericStatusEnum.ACTIVE}
        }).then((portalUser) => {
            if (portalUser) {
                return this.authenticationUtils
                    .comparePassword(loginDto.password, portalUser.password).then((isTrue) => {
                        if (isTrue) {
                            return Promise.resolve(portalUser);
                        } else {
                            return Promise.reject('User name or password does is incorrect');
                        }
                    });
            }
            return Promise.reject('User name or password is incorrect');
        });
    }

    private verifyRequest(req: Request, cb: VerifyCallback) {
        const authorisationToken = req.header('Authorization');
        if (!authorisationToken) {
            return false;
        }
        const splitedAuthorisationToken = authorisationToken.split(' ');
        if (splitedAuthorisationToken[0] !== 'Bearer') {
            return false;
        }
        verify(splitedAuthorisationToken[1],
            process.env.AUTH_SECRET,
            {ignoreExpiration: false},
            cb);
    }
}
