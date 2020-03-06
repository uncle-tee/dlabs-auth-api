import {INestApplication} from '@nestjs/common';
import {Connection} from 'typeorm/connection/Connection';
import {TestUtils} from './utils/TestUtils';
import {App} from '../../domain/entity/App';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../app.module';
import {getConnection} from 'typeorm';
import * as request from 'supertest';
import {ModelFactory} from '../../test-starter/orm-faker/contracts/ModelFactory';
import {Permission} from '../../domain/entity/Permission';
import {PermissionModelFactory} from '../../test-starter/factory/PermissionModelFactory';

describe('PermissionController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let authApp: App;
    let modelFactory: ModelFactory;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        applicationContext = moduleRef.createNestApplication();
        connection = getConnection();
        await applicationContext.init();
        testUtils = TestUtils.getInstance(connection);
        modelFactory = testUtils.initModelFactory();
        authApp = await testUtils.getAuthorisedApp();

    });

    it('Test of permission can be created', () => {
        return request(applicationContext.getHttpServer())
            .post('/permissions')
            .set({
                'X-APP-CODE': authApp.code,
                'X-APP-TOKEN': authApp.token
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
