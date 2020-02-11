import {Module} from '@nestjs/common';
import {ServiceModule} from '../service/service.module';
import {DaoModule} from '../dao/dao.module';
import {CoreModule} from '../core/core.module';
import {DLabsCommonModule} from '../d-labs-common/d-labs-common.module';
import {AuthenticationController} from './authentication/AuthenticationController';
import {PermissionController} from './rolesAndPermission/PermissionController';

@Module({
    imports: [
        ServiceModule,
        DaoModule,
        CoreModule,
        DLabsCommonModule
    ],
    controllers: [AuthenticationController, PermissionController]
})
export class ControllerModule {
}
