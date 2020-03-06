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
import {Permission} from '../../domain/entity/Permission';
import {PermissionModelFactory} from '../../test-starter/factory/PermissionModelFactory';
import * as faker from 'faker';
import {asap} from 'rxjs/internal/scheduler/asap';

describe('RoleController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let authenticationService: AuthenticationService;
    let authorisedApp: App;
    let loginToken: string;
    let permissions: Permission[];

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        applicationContext = moduleRef.createNestApplication();
        authenticationService = applicationContext.select(ServiceModule).get(AuthenticationService, {strict: true});
        connection = getConnection();
        await applicationContext.init();
        testUtils = TestUtils.getInstance(connection);
        authorisedApp = await testUtils.getAuthorisedApp();
        loginToken = await testUtils.mockLoginUser(authenticationService, authorisedApp);
        permissions = await testUtils.initModelFactory()
            .upset<Permission>(PermissionModelFactory.TAG)
            .use((it) => {
                it.app = authorisedApp;
                return it;
            }).createMany(5);

    });
    it('That that user cannot create role if the permissions codes are not on the app.', async () => {
        const permissionCodes = (await testUtils
            .initModelFactory()
            .createMany<Permission>(5, PermissionModelFactory.TAG))
            .map(permission => permission.code);
        await request(applicationContext.getHttpServer())
            .post('/role-management/roles')
            .set({
                'X-APP-CODE': authorisedApp.code,
                'X-APP-TOKEN': authorisedApp.token,
                'Authorization': `Bearer ${loginToken}`
            }).send({
                name: faker.random.word(),
                permissionCodes,
                description: faker.random.words(40)
            }).expect(400);
    });

    it('Test if role is created', async () => {
        await request(applicationContext.getHttpServer())
            .post('/role-management/roles')
            .set({
                'X-APP-CODE': authorisedApp.code,
                'X-APP-TOKEN': authorisedApp.token,
                'Authorization': `Bearer ${loginToken}`
            })
            .send(
                {
                    name: 'newPermission',
                    permissionCodes: permissions.map(val => val.code),
                    description: faker.random.words(40)

                }
            ).expect(201);
    });

    afterAll(async () => {
        await connection.close();
        await applicationContext.close();

    });
});
