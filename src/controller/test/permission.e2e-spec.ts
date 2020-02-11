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
import {NestFactory} from '@nestjs/core';

describe('PermissionController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let appHeader: App;
    let authenticationService: AuthenticationService;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        applicationContext = moduleRef.createNestApplication();
        authenticationService = applicationContext
            .select(ServiceModule)
            .get(AuthenticationService, {strict: true});
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
        await applicationContext.close();
        await connection.close();

    });
});
