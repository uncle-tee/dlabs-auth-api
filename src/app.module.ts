import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DomainModule} from './domain/domain.module';
import {CoreModule} from './core/core.module';

@Module({
    imports: [DomainModule, CoreModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
