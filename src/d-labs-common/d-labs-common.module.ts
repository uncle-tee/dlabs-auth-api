import {Module} from '@nestjs/common';
import {AuthenticationUtils} from './authentication-utils.service';
import {WinstonModule} from 'nest-winston';
import * as winston from 'winston';
import {Provider} from './Provider';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({format: winston.format.json()})
            ]
        })
    ],
    exports: [AuthenticationUtils, WinstonModule, Provider],
    providers: [AuthenticationUtils, Provider]
})
export class DLabsCommonModule {
}
