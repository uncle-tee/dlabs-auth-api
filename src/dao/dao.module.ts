import {Module} from '@nestjs/common';
import {PortalUserRepository} from './PortalUserRepository';
import {AppRepository} from './AppRepository';
import {PortalAccountRepository} from './PortalAccountRepository';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    providers: [PortalUserRepository, AppRepository, PortalAccountRepository],
    exports: [PortalUserRepository, AppRepository, PortalAccountRepository]
})
export class DaoModule {
}
