/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 20/02/2020 */

import {Module} from '@nestjs/common';
import {ServiceModule} from '../service/service.module';

import {TestUtils} from './config/TestUtils';

@Module({
    imports: [
        ServiceModule,
    ],
    providers: [
        TestUtils,
    ]
})
export class TestStarterModule {

}

