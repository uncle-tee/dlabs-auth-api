import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DomainModule} from './domain/domain.module';
import {CoreModule} from './core/core.module';
import { DaoModule } from './dao/dao.module';
import { ControllerModule } from './controller/controller.module';
import { DtoModule } from './dto/dto.module';
import { ServiceModule } from './service/service.module';
import { DLabsCommonModule } from './d-labs-common/d-labs-common.module';

@Module({
    imports: [DomainModule, CoreModule, DaoModule, ControllerModule, DtoModule, ServiceModule, DLabsCommonModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
