import {INestApplication} from '@nestjs/common';
import {Connection} from 'typeorm/connection/Connection';
import {TestUtils} from './utils/TestUtils';
import {App} from '../../domain/entity/App';
import {AuthenticationService} from '../../service/AuthenticationService';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../app.module';
import {ServiceModule} from '../../service/service.module';
import {getConnection} from 'typeorm';
import * as request from 'supertest';

describe('RoleController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let authenticationService: AuthenticationService;
    let appHeader: App;
    let loginToken: string;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        applicationContext = moduleRef.createNestApplication();
        authenticationService = applicationContext.select(ServiceModule).get(AuthenticationService, {strict: true});
        connection = getConnection();
        await applicationContext.init();
        testUtils = new TestUtils(connection);
        appHeader = await testUtils.getAuthorisedApp();
        loginToken = await testUtils.mockLoginUser(authenticationService, appHeader);

    });
    it('Test if role is corrected', async () => {
        await request(applicationContext.getHttpServer())
            .post('/permissions')
            .set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': loginToken
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
