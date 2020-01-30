import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {ServiceModule} from '../service/service.module';
import {WinstonModule} from 'nest-winston';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import {RequestInterceptor} from './security/RequestInterceptor';
import * as winston from 'winston';
import {LoggerInterceptor} from './security/LoggerInterceptor';

@Module({
    imports: [CoreModule,
        ServiceModule, WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({format: winston.format.json()})
            ]
        })],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: LoggerInterceptor
    },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestInterceptor
        }]
})
export class ConfModule {
}
