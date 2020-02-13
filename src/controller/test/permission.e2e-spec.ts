import {INestApplication} from '@nestjs/common';
import {Connection} from 'typeorm/connection/Connection';
import {TestUtils} from './utils/TestUtils';
import {App} from '../../domain/entity/App';
import {PortalUserDto} from '../../dto/portalUser/PortalUserDto';
import {AuthenticationService} from '../../service/AuthenticationService';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../app.module';
import {AppService} from '../../app.service';
import {ServiceModule} from '../../service/service.module';
import {getConnection} from 'typeorm';
import * as request from 'supertest';
import * as faker from 'faker';
import {APP_INTERCEPTOR, NestFactory} from '@nestjs/core';
import {AuthenticationInterceptor} from '../../conf/security/interceptors/AuthenticationInterceptor.service';
import {MockLoggerInterceptor} from './utils/MockLoggerInterceptor';
import {LoggerInterceptor} from '../../conf/security/interceptors/LoggerInterceptor';

describe('PermissionController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let appHeader: App;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).overrideInterceptor(APP_INTERCEPTOR)
            .useClass(MockLoggerInterceptor).compile();

        applicationContext = moduleRef.createNestApplication();
        connection = getConnection();
        await applicationContext.init();
        testUtils = new TestUtils(connection);
        appHeader = await testUtils.getAuthorisedApp();
    });

    it('Test of permission can be created', async () => {
        await request(applicationContext.getHttpServer())
            .post('/permissions')
            .set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
            })
            .send(
                {
                    permissionName: 'newPermission'

                }
            ).expect(201);
    });

    afterAll(async () => {
        await connection.close();
        await applicationContext.close();

    });
});