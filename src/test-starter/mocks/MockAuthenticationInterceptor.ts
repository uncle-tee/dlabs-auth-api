// /* Oluwatobi Adenekan,mailtobi@dlabs.cloud 13/02/2020 */
// import {AuthenticationInterceptor} from '../../conf/security/interceptors/AuthenticationInterceptor.service';
// import {Reflector} from '@nestjs/core';
// import {AuthenticationService} from '../../service/AuthenticationService';
// import {Connection} from 'typeorm';
// import {CallHandler, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
// import {Observable} from 'rxjs';
// import {AccessType} from '../../conf/security/accessTypes/AccessType';
// import {PortalUserRepository} from '../../dao/PortalUserRepository';
// import {PortalUser} from '../../domain/entity/PortalUser';
// import {Principal} from '../../conf/security/requestPrincipal/Principal';
// import {TokenExpiredError} from 'jsonwebtoken';
// import {PortalUserDto} from '../../dto/portalUser/PortalUserDto';
// import * as faker from 'faker';
// import {GenderConstant} from '../../domain/enums/GenderConstant';
// import {App} from '../../domain/entity/App';
// import {Test} from '../config/Test';
//
// // @ts-ignore
// export class MockAuthenticationInterceptor extends AuthenticationInterceptor {
//
//     constructor(private readonly reflector: Reflector,
//                 private readonly authenticationService: AuthenticationService,
//                 private readonly  connection: Connection) {
//
//         super(reflector, authenticationService, connection);
//     }
//
//     // @ts-ignore
//     async intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//         const publicAccesstypes = this.reflector.getAll(AccessType.PUBLIC, [
//             context.getHandler(), context.getClass()
//         ]);
//
//         if (publicAccesstypes.includes(AccessType.PUBLIC)) {
//             return next.handle();
//         }
//
//         const request = context.switchToHttp().getRequest();
//         const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
//
//         return next.handle();
//     }
//
// }
//
