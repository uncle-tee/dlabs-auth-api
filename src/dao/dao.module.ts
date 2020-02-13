import {Module} from '@nestjs/common';
import {PortalUserRepository} from './PortalUserRepository';
import {AppRepository} from './AppRepository';
import {PortalAccountRepository} from './PortalAccountRepository';
import {RoleRepository} from './RoleRepository';

@Module({
    providers: [
        PortalUserRepository,
        AppRepository,
        PortalAccountRepository,
        RoleRepository],
    exports: [PortalUserRepository,
        AppRepository,
        PortalAccountRepository,
        RoleRepository]
})
export class DaoModule {
}
