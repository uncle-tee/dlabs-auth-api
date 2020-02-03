import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {ServiceModule} from '../service/service.module';
import {WinstonModule} from 'nest-winston';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import {AppInterceptor} from './security/interceptors/AppInterceptor';
import * as winston from 'winston';
import {LoggerInterceptor} from './security/interceptors/LoggerInterceptor';
import {DaoModule} from '../dao/dao.module';
import {AuthenticationInterceptor} from './security/interceptors/AuthenticationInterceptor.service';


@Module({
    imports: [
        CoreModule,
        DaoModule,
        ServiceModule,
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({format: winston.format.json()})
            ]
        })],
    exports: [],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LoggerInterceptor
    },
        {
            provide: APP_INTERCEPTOR,
            useClass: AppInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: AuthenticationInterceptor
        }]
})
export class ConfModule {
}
