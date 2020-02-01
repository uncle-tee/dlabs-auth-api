import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {WinstonModule} from 'nest-winston';
import {RequestInterceptor} from './conf/security/RequestInterceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {});
    app.setGlobalPrefix(`api/v${process.env.VERSION}`);
    await app.listen(3000);
}

bootstrap();
