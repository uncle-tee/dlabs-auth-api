import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PortalAccountSequenceGenerator} from './sequenceGenerators/PortalAccountSequenceGenerator';
import {AppIdSequenceGenerator} from './sequenceGenerators/AppIdSequenceGenerator';
import {PermissionSequenceGenerator} from './sequenceGenerators/PermissionSequenceGenerator';
import {RoleCodeSequenceGenerator} from './sequenceGenerators/RoleCodeSequenceGenerator';

@Module({
    imports: [
        TypeOrmModule.forRoot()
    ],
    exports: [
        TypeOrmModule,
        PortalAccountSequenceGenerator,
        AppIdSequenceGenerator,
        PermissionSequenceGenerator,
        RoleCodeSequenceGenerator
    ],
    providers: [
        PortalAccountSequenceGenerator,
        AppIdSequenceGenerator,
        PermissionSequenceGenerator,
        RoleCodeSequenceGenerator
    ]
})
export class CoreModule {
}
