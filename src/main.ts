import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {WinstonModule} from 'nest-winston';
import {AppInterceptor} from './conf/security/interceptors/AppInterceptor';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {DtoModule} from './dto/dto.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {});
    app.setGlobalPrefix(`api/v${process.env.VERSION}`);

    const swaggerDocumentsBuilder = new DocumentBuilder()
        .setTitle(process.env.PROJECT_NAME)
        .setDescription(process.env.PROJECT_DESCRIPTION)
        .setVersion(process.env.VERSION)
        .addTag('Dlabs Authentication API')
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentsBuilder);
    SwaggerModule.setup('api-docs', app, swaggerDocument);

    await app.listen(3000);
}

bootstrap();
