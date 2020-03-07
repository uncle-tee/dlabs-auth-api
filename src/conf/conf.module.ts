import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {ServiceModule} from '../service/service.module';
import {WinstonModule} from 'nest-winston';
import {APP_GUARD, APP_INTERCEPTOR, APP_PIPE} from '@nestjs/core';
import {AppInterceptor} from './security/interceptors/AppInterceptor';
import * as winston from 'winston';
import {LoggerInterceptor} from './security/interceptors/LoggerInterceptor';
import {DaoModule} from '../dao/dao.module';
import {AuthenticationInterceptor} from './security/interceptors/AuthenticationInterceptor.service';
import {DLabsCommonModule} from '../d-labs-common/d-labs-common.module';
import {ValidatorInterceptor} from './security/interceptors/ValidatorInterceptor';

@Module({
    imports: [
        CoreModule,
        DaoModule,
        ServiceModule,
        DLabsCommonModule,
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({format: winston.format.json()})
            ]
        })],
    exports: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useExisting: LoggerInterceptor
        },
        LoggerInterceptor,
        {
            provide: APP_INTERCEPTOR,
            useExisting: AppInterceptor
        },
        AppInterceptor,
        {
            provide: APP_INTERCEPTOR,
            useExisting: AuthenticationInterceptor
        },
        AuthenticationInterceptor]
})
export class ConfModule {
}
