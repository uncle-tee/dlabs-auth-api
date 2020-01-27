import {Module} from '@nestjs/common';
import {PortalUserRepository} from './PortalUserRepository';

@Module({
    providers: [PortalUserRepository],
    exports: [PortalUserRepository]
})
export class DaoModule {
}
