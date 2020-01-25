import {Module} from '@nestjs/common';
import {ServiceModule} from '../service/service.module';
import {DaoModule} from '../dao/dao.module';
import {CoreModule} from '../core/core.module';

@Module({
    imports: [
        ServiceModule,
        DaoModule,
        CoreModule
    ]
})
export class ControllerModule {
}
