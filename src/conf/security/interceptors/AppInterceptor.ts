import {ExecutionContext, Inject, Injectable, NestInterceptor, CallHandler, HttpException, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../../service/AuthenticationService';
import {Reflector} from '@nestjs/core';
import {Logger} from 'winston';
import {App} from '../../../domain/entity/App';
import {AccessType} from '../accessTypes/AccessType';
import {ExceptionsHandler} from '@nestjs/core/exceptions/exceptions-handler';
import {AppRepository} from '../../../dao/AppRepository';
import {Connection} from 'typeorm';
import {Request} from 'express';

@Injectable()
export class AppInterceptor implements NestInterceptor {

    constructor(private readonly authenticationService: AuthenticationService,
                private readonly reflector: Reflector,
                private readonly connection: Connection,
                @Inject('winston') private readonly logger: Logger) {
    }

    // @ts-ignore
    async intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();
        const token = request.header('X-APP-TOKEN');
        const code = request.header('X-APP-CODE');

        const app = await this.connection.getCustomRepository(AppRepository).findOneItem({
            token, code
        });

        if (!app) {

            throw new UnauthorizedException('Only Authorised app can have access');
        }

        request.app = app;
        return next.handle();
    }

}
