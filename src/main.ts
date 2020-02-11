import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidatorInterceptor} from './conf/security/interceptors/ValidatorInterceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {});
    app.setGlobalPrefix(`api/v${process.env.VERSION}`);
    app.useGlobalPipes(new ValidatorInterceptor());

    // const swaggerDocumentsBuilder = new DocumentBuilder()
    //     .setTitle(process.env.PROJECT_NAME)
    //     .setDescription(process.env.PROJECT_DESCRIPTION)
    //     .setVersion(process.env.VERSION)
    //     .addTag('Dlabs Authentication API')
    //     .build();
    //
    // const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentsBuilder);
    // SwaggerModule.setup('api-docs', app, swaggerDocument);

    await app.listen(3000);
}

bootstrap();
