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
import {AuthenticationInterceptor} from '../../conf/security/interceptors/AuthenticationInterceptor.service';
import {MockAuthenticationInterceptor} from './utils/MockAuthenticationInterceptor';

describe('PermissionController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let appHeader: App;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(AuthenticationInterceptor)
            .useClass(MockAuthenticationInterceptor)
            .compile();

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
                'X-APP-TOKEN': appHeader.token
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
