import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PortalAccountSequenceGenerator} from './sequenceGenerators/PortalAccountSequenceGenerator';
import {AppIdSequenceGenerator} from './sequenceGenerators/AppIdSequenceGenerator';

@Module({
    imports: [
        TypeOrmModule.forRoot()
    ],
    exports: [
        TypeOrmModule,
        PortalAccountSequenceGenerator,
        AppIdSequenceGenerator
    ],
    providers: [
        PortalAccountSequenceGenerator,
        AppIdSequenceGenerator
    ]
})
export class CoreModule {
}
