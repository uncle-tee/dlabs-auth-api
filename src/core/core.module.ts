import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PortalAccountSequenceGenerator} from './sequenceGenerators/PortalAccountSequenceGenerator';
import {AppIdSequenceGenerator} from './sequenceGenerators/AppIdSequenceGenerator';
import {PermissionSequenceGenerator} from './sequenceGenerators/PermissionSequenceGenerator';

@Module({
    imports: [
        TypeOrmModule.forRoot()
    ],
    exports: [
        TypeOrmModule,
        PortalAccountSequenceGenerator,
        AppIdSequenceGenerator,
        PermissionSequenceGenerator
    ],
    providers: [
        PortalAccountSequenceGenerator,
        AppIdSequenceGenerator,
        PermissionSequenceGenerator
    ]
})
export class CoreModule {
}
