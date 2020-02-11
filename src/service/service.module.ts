import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {DaoModule} from '../dao/dao.module';
import {DtoModule} from '../dto/dto.module';
import {AuthenticationService} from './AuthenticationService';
import {DLabsCommonModule} from '../d-labs-common/d-labs-common.module';
import {ConfModule} from '../conf/conf.module';
import {PermissionService} from './PermissionService';

@Module({
    imports: [
        CoreModule,
        DaoModule,
        DLabsCommonModule
    ],
    exports: [
        AuthenticationService, PermissionService
    ],
    providers: [
        AuthenticationService, PermissionService
    ]
})
export class ServiceModule {
}
