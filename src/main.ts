import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {WinstonModule} from 'nest-winston';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {});
    console.log(`${process.env.TYPEORM_USERNAME} `);

    await app.listen(3000);
}

bootstrap();
