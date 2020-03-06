/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 20/02/2020 */

import {AppInterceptor} from '../../../conf/security/interceptors/AppInterceptor';
import {AuthenticationService} from '../../../service/AuthenticationService';
import {Reflector} from '@nestjs/core';
import {Connection} from 'typeorm';
import {CallHandler, ExecutionContext, Inject, UnauthorizedException} from '@nestjs/common';
import {Logger} from 'winston';
import {Observable} from 'rxjs';
import {AppRepository} from '../../../dao/AppRepository';
import {ModelFactoryImpl} from '../../../test-starter/orm-faker/ModelFactoryImpl';
import {Console} from 'inspector';
import {ModelFactory} from '../../../test-starter/orm-faker/contracts/ModelFactory';
import {AppFactory} from '../../../test-starter/factory/AppFactory';

// @ts-ignore
export class MockAppInterceptor extends AppInterceptor {

    public constructor(private readonly authenticationService: AuthenticationService,
                       private readonly reflector: Reflector,
                       private readonly connection: Connection,
                       @Inject('modelFactory') private readonly modelFactory: ModelFactory,
                       @Inject('winston') private readonly logger: Logger) {
        super(authenticationService, reflector, connection, logger);

    }

    // @ts-ignore
    async intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();
        const token = request.header('X-APP-TOKEN');
        const code = request.header('X-APP-CODE');
        if (!token || !code) {
            throw new UnauthorizedException('Token and code must be provided');
        }
        const app = this.modelFactory.create(AppFactory.TAG);

        request.app = app;
        return next.handle();
    }

}
