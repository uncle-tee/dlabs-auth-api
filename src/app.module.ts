import {Module} from '@nestjs/common';

import {DomainModule} from './domain/domain.module';
import {CoreModule} from './core/core.module';
import {DaoModule} from './dao/dao.module';
import {ControllerModule} from './controller/controller.module';
import {DtoModule} from './dto/dto.module';
import {ServiceModule} from './service/service.module';
import {DLabsCommonModule} from './d-labs-common/d-labs-common.module';
import {ConfigModule} from '@nestjs/config';
import {WinstonModule} from 'nest-winston';
import {ConfModule} from './conf/conf.module';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import {RequestInterceptor} from './conf/security/RequestInterceptor';
import {LoggerInterceptor} from './conf/security/LoggerInterceptor';

@Module({
    imports: [DomainModule, CoreModule,
        DaoModule, ControllerModule,
        DtoModule, ServiceModule,
        DLabsCommonModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        WinstonModule.forRoot({}),
        ConfModule
    ]
})
export class AppModule {
}
