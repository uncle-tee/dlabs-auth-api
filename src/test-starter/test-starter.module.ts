/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 20/02/2020 */

import {Module} from '@nestjs/common';
import {ServiceModule} from '../service/service.module';
import {TestUtils} from '../controller/test/utils/TestUtils';

@Module({
    imports: [
        ServiceModule,
    ],
    providers: []
})
export class TestStarterModule {
}

