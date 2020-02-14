import {ConflictException, Inject, Injectable, NotFoundException, Scope, UnauthorizedException} from '@nestjs/common';
import {AuthenticationUtils} from '../d-labs-common/authentication-utils.service';
import {verify, VerifyCallback, VerifyErrors} from 'jsonwebtoken';
import {Request} from 'express';
import {Connection} from 'typeorm';
import {PortalUserDto} from '../dto/portalUser/PortalUserDto';
import {PortalUser} from '../domain/entity/PortalUser';
import {GenericStatusConstant} from '../domain/enums/GenericStatusConstant';
import {PortalUserRepository} from '../dao/PortalUserRepository';
import {LoginDto} from '../dto/auth/LoginDto';
import {App} from '../domain/entity/App';
import {PortalUserAccount} from '../domain/entity/PortalUserAccount';
import {PortalAccountRepository} from '../dao/PortalAccountRepository';
import {PortalAccount} from '../domain/entity/PortalAccount';
import {Logger} from 'winston';
import {PortalAccountSequenceGenerator} from '../core/sequenceGenerators/PortalAccountSequenceGenerator';

export class AuthenticationService {

    constructor(private readonly authenticationUtils: AuthenticationUtils,
                private readonly connection: Connection,
                private readonly portalAccountSequenceGenerator: PortalAccountSequenceGenerator,
                @Inject('winston') private readonly logger: Logger) {

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

    public signUpUser(userDto: PortalUserDto, app: App): Promise<PortalUser> {
        if (!app) {
            throw new UnauthorizedException(app);
        }

        return this.connection.transaction(async (entityManager) => {

            let portalAccount = null;

            if (userDto.portalAccountName) {
                portalAccount = await entityManager.getCustomRepository(PortalAccountRepository).findOneItem({
                    name: userDto.username
                });
                if (portalAccount) {
                    throw new NotFoundException(`Portal account with name cannot be found ${userDto.portalAccountName}`);
                }
            } else {
                const existingPortalAccount = await entityManager.getCustomRepository(PortalAccountRepository).findOneItem({
                    name: userDto.username,
                    app
                });

                if (existingPortalAccount) {
                    throw new ConflictException(`username ${userDto.username} already exist`);
                }
                portalAccount = new PortalAccount();
                portalAccount.name = userDto.username;
                portalAccount.app = app;
                portalAccount.accountId = await this.portalAccountSequenceGenerator.next();
                portalAccount.status = GenericStatusConstant.ACTIVE;
                await entityManager.save(portalAccount);
            }

            const portalUserWithUsername: number = await entityManager
                .getCustomRepository(PortalUserRepository)
                .countPortalUserUserNameByApp(userDto.username, portalAccount, portalAccount);

            if (portalUserWithUsername) {
                throw new ConflictException('User name already Exist');
            }
            const portalUserWithEmail: number = await entityManager
                .getCustomRepository(PortalUserRepository)
                .countEmailByApp(userDto.email, app, portalAccount);

            if (portalUserWithEmail) {
                throw new ConflictException(('Email already Exist'));
            }

            if (!portalAccount) {
                throw new NotFoundException(`Portal account with id ${userDto.portalAccountName} cannot be found`);
            }
            const portalUser = new PortalUser();
            portalUser.firstName = userDto.firstName;
            portalUser.lastName = userDto.lastName;
            portalUser.username = userDto.username.toLowerCase();
            portalUser.password = await this.authenticationUtils.hashPassword(userDto.password.toLowerCase());
            portalUser.gender = userDto.gender;
            portalUser.email = userDto.email;
            portalUser.phoneNumber = userDto.phoneNumber;
            portalUser.status = GenericStatusConstant.ACTIVE;
            await entityManager.save(portalUser);
            const portalUserAccount = new PortalUserAccount();
            portalUserAccount.portalUser = portalUser;
            portalUserAccount.portalAccount = portalAccount;
            await entityManager.save(portalUserAccount);
            return portalUser;

        });
    }

    public loginUser(loginDto: LoginDto, app: App): Promise<string> {

        return this.connection.getCustomRepository(PortalUserRepository).createQueryBuilder('portalUser')
            .select()
            .where('portalUser.username = :username')
            .setParameter('username', loginDto.username.toLowerCase())
            .innerJoin(PortalUserAccount, 'portalUserAccount', 'portalUserAccount.portalUser =  portalUser.id')
            .innerJoin(PortalAccount, 'portalAccount', 'portalUserAccount.portalAccount = portalAccount.id')
            .where('portalAccount.app = :app')
            .setParameter('app', app.id)
            .distinct().getOne()
            .then(async portalUserValue => {
                if (portalUserValue) {
                    const isTrue = await this.authenticationUtils
                        .comparePassword(loginDto.password, portalUserValue.password);
                    if (isTrue) {
                        const token = await this.authenticationUtils.generateToken(portalUserValue.id);
                        return Promise.resolve(token);
                    }
                    throw new UnauthorizedException('Username or password is incorrect');
                } else {
                    throw new UnauthorizedException('Username or password is incorrect');
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
