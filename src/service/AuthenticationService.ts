import {Injectable, NotFoundException} from '@nestjs/common';
import {AuthenticationUtils} from '../d-labs-common/authentication-utils.service';
import {verify, VerifyCallback, VerifyErrors} from 'jsonwebtoken';
import {Request} from 'express';
import {Connection} from 'typeorm';
import {PortalUserDto} from '../dto/portalUser/PortalUserDto';
import {PortalUser} from '../domain/entity/PortalUser';
import {GenericStatusConstant} from '../domain/enums/GenericStatusConstant';
import {PortalUserRepository} from '../dao/PortalUserRepository';
import {LoginDto} from '../dto/auth/LoginDto';
import {AppRepository} from '../dao/AppRepository';
import {App} from '../domain/entity/App';
import {PortalUserAccount} from '../domain/entity/PortalUserAccount';
import {PortalAccountRepository} from '../dao/PortalAccountRepository';
import {PortalAccount} from '../domain/entity/PortalAccount';

@Injectable()
export class AuthenticationService {

    constructor(private readonly authenticationUtils: AuthenticationUtils,
                private readonly connection: Connection,
                private readonly appRepository: AppRepository,
                private readonly portalUserRepository: PortalUserRepository) {
    }

    public verifyIncomingRequest = (req: Request) => new Promise((resolve, reject) => {
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

    public signUpUser(userDto: PortalUserDto, re): Promise<PortalUser> {
        return this.connection.transaction((async (entityManager) => {
            let portalAccount = null;

            if (userDto.portalAccountId) {
                portalAccount = await entityManager.getCustomRepository(PortalAccountRepository).findOneItem({
                    accountIdSequence: userDto.portalAccountId
                });
            } else {
                portalAccount = new PortalAccount();
                portalAccount.name = `${userDto.firstName} ${userDto.lastName}`;
                portalAccount.app = app;
                portalAccount.status = GenericStatusConstant.ACTIVE;
            }

            if (!portalAccount) {
                throw new NotFoundException(`Portal account with id ${userDto.portalAccountId} cannot be found`);
            }
            const portalUser = new PortalUser();
            portalUser.firstName = userDto.firstName;
            portalUser.lastName = userDto.lastName;
            portalUser.username = userDto.username.toLowerCase();
            portalUser.password = await this.authenticationUtils.hashPassword(userDto.password.toLowerCase());
            portalUser.gender = userDto.gender;
            portalUser.status = GenericStatusConstant.ACTIVE;
            await entityManager.save(portalUser);
            const portalUserAccount = new PortalUserAccount();
            portalUserAccount.portalUser = portalUser;
            portalUserAccount.portalAccount = portalAccount;
            await entityManager.save(portalUserAccount);
            return portalUser;

        }));
    }

    public loginUser(loginDto: LoginDto, request: Request): Promise<PortalUser> {
        const appId = request.header('X-APP-ID');
        const app: Promise<App> = this.appRepository.findOneItem({token: appId}).then(value => {
            if (!value) {
                throw new NotFoundException(`App with token ${appId} cannot be found`);
            }
            return Promise.resolve(value);
        });

        return app.then(appValue => {
            if (appValue) {
                return this.portalUserRepository.createQueryBuilder('portalUser')
                    .select()
                    .where('portalUser.username = :username')
                    .setParameter('username', loginDto.username)
                    .innerJoin(PortalUserAccount, 'portalUserAccount', 'portalUserAccount.portalUser =  portalUser')
                    .where('portalUserAccount.app = :app')
                    .setParameter('app', appValue)
                    .distinct().getOne().then(async portalUserValue => {
                        if (portalUserValue) {
                            const isTrue = await this.authenticationUtils
                                .comparePassword(loginDto.password, portalUserValue.password);
                            if (isTrue) {
                                return Promise.resolve(portalUserValue);
                            }
                        } else {
                            return Promise.reject('User name or password does is incorrect');
                        }
                    });
            } else {
                return Promise.reject('App does not exist');
            }
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
