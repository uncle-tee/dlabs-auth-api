import {Module} from '@nestjs/common';
import {AuthenticationUtils} from './authentication-utils.service';
import {WinstonModule} from 'nest-winston';
import * as winston from 'winston';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [

            ]
        })
    ],
    exports: [AuthenticationUtils],
    providers: [AuthenticationUtils]
})
export class DLabsCommonModule {
}
