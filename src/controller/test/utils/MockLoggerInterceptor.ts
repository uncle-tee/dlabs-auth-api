import {AuthenticationInterceptor} from '../../../conf/security/interceptors/AuthenticationInterceptor.service';
import {CallHandler, ExecutionContext, NestInterceptor, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {LoggerInterceptor} from '../../../conf/security/interceptors/LoggerInterceptor';
import {Reflector} from '@nestjs/core';
import {Connection} from 'typeorm';

export class MockLoggerInterceptor implements NestInterceptor {
    reflex: Reflector;
    conn: Connection;

    constructor(private readonly reflector: Reflector, private readonly connection: Connection) {
        this.reflex = reflector;
        this.conn = connection;
    }

    // @ts-ignore
    async intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // tslint:disable-next-line:no-console
        console.log(context.switchToHttp().getRequest().body);
        await this.conn.createEntityManager().save(context.switchToHttp().getRequest().body);
        return next.handle();
    }

}
