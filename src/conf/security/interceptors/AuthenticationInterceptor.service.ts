import {CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AccessType} from '../accessTypes/AccessType';
import {Reflector} from '@nestjs/core';
import {Connection} from 'typeorm';
import {AuthenticationService} from '../../../service/AuthenticationService';
import {PortalUserRepository} from '../../../dao/PortalUserRepository';
import {PortalUser} from '../../../domain/entity/PortalUser';
import {Principal} from '../requestPrincipal/Principal';
import {TokenExpiredError} from 'jsonwebtoken';
import {GenericStatusConstant} from '../../../domain/enums/GenericStatusConstant';

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector,
                private readonly authenticationService: AuthenticationService,
                private readonly  connection: Connection) {
    }

    // @ts-ignore
    async intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const publicAccesstypes = this.reflector.getAll(AccessType.PUBLIC, [
            context.getHandler(), context.getClass()
        ]);

        if (publicAccesstypes.includes(AccessType.PUBLIC)) {
            return next.handle();
        }

        const request = context.switchToHttp().getRequest();
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        const authorisationHeader = request.headers.authorization;
        if (!authorisationHeader) {
            throw new UnauthorizedException('Authorisation header is not provided');
        }
        await this.authenticationService
            .verifyIncomingRequest(request)
            .then((decoded: { sub: string }) => {
                return this.connection.getCustomRepository(PortalUserRepository).findOneItem({
                    id: Number(decoded.sub),
                    status: GenericStatusConstant.ACTIVE
                });
            }).then((portalUser: PortalUser) => {
                if (!portalUser) {
                    throw new UnauthorizedException('User is not active');
                }
                delete portalUser.password;
                request.requestPrincipal = new Principal(portalUser, ip);
            }).catch((error) => {
                if (error instanceof TokenExpiredError) {
                    const tokenError = error as TokenExpiredError;
                    throw new UnauthorizedException(tokenError.message);
                }
                if (error instanceof UnauthorizedException) {
                    throw new UnauthorizedException('Client is not authorised to login');
                }

                throw  error;
                // throw new UnauthorizedException('Client is not authorised to log in');

            });

        return next.handle();
    }

}
