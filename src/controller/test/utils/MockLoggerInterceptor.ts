import {AuthenticationInterceptor} from '../../../conf/security/interceptors/AuthenticationInterceptor.service';
import {CallHandler, ExecutionContext, NestInterceptor, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {LoggerInterceptor} from '../../../conf/security/interceptors/LoggerInterceptor';
import {Reflector} from '@nestjs/core';
import {Connection} from 'typeorm';
import {AccessType} from '../../../conf/security/accessTypes/AccessType';

// @ts-ignore
export class MockLoggerInterceptor extends LoggerInterceptor {

    constructor(private readonly reflector: Reflector, private readonly connection: Connection) {
        super(reflector, connection);
    }

    // @ts-ignore
    async intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        await this.connection.transaction(async (entityManager) => {
            return entityManager.save(context.switchToHttp().getRequest().body);
        });
        return next.handle();
    }

}
