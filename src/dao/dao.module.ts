import {Module} from '@nestjs/common';
import {PortalUserRepository} from './PortalUserRepository';
import {AppRepository} from './AppRepository';
import {PortalAccountRepository} from './PortalAccountRepository';

@Module({
    providers: [PortalUserRepository, AppRepository, PortalAccountRepository],
    exports: [PortalUserRepository, AppRepository, PortalAccountRepository]
})
export class DaoModule {
}
