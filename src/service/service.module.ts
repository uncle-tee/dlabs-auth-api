import {Module} from '@nestjs/common';
import {CoreModule} from '../core/core.module';
import {DaoModule} from '../dao/dao.module';
import {DtoModule} from '../dto/dto.module';

@Module({
    imports: [
        CoreModule,
        DaoModule
    ]
})
export class ServiceModule {
}
