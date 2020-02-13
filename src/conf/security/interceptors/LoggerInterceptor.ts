import {CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Logger} from 'winston';
import {Connection} from 'typeorm';
import {Reflector} from '@nestjs/core';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(private readonly connection: Connection, private readonly reflector: Reflector) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // tslint:disable-next-line:no-console
        console.log(context.switchToHttp().getRequest().body);
        return next.handle();
    }
}
