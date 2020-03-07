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
import {ModelFactory} from '../../test-starter/orm-faker/contracts/ModelFactory';
import {Role} from '../../domain/entity/Role';
import {RolePermission} from '../../domain/entity/RolePermission';
import {RolePermissionModelFactory} from '../../test-starter/factory/RolePermissionModelFactory';
import {RoleModelFactory} from '../../test-starter/factory/RoleModelFactory';
import {RoleRepository} from '../../dao/RoleRepository';
import {GenericStatusConstant} from '../../domain/enums/GenericStatusConstant';
import arrayContaining = jasmine.arrayContaining;

describe('RoleController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let authenticationService: AuthenticationService;
    let authorisedApp: App;
    let loginToken: string;
    let modelFactory: ModelFactory;

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
        modelFactory = testUtils.initModelFactory();

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

    it('Test that a role can be deleted by code', async () => {
        const roles = await modelFactory.upset<Role>(RoleModelFactory.TAG).use((r) => {
            r.app = authorisedApp;
            return r;
        }).createMany(4);
        for (let i = 0; i <= 3; i++) {
            await request(applicationContext.getHttpServer())
                .delete(`/role-management/roles/${roles[i].code}`)
                .set({
                    'X-APP-CODE': authorisedApp.code,
                    'X-APP-TOKEN': authorisedApp.token,
                    'Authorization': `Bearer ${loginToken}`
                }).expect(200);
        }

        const count = await connection.getCustomRepository(RoleRepository)
            .count({
                status: GenericStatusConstant.DELETED,
                app: authorisedApp
            });
        expect(count).toEqual(4);
    });

    it('Test that a role can be found by code', async () => {
        await modelFactory.createMany<Permission>(3, PermissionModelFactory.TAG);
        for (let i = 0; i <= 3; i++) {

            const role = await modelFactory.upset<Role>(RoleModelFactory.TAG)
                .use(mockRole => {
                    mockRole.app = authorisedApp;
                    return mockRole;
                }).create();

            const permissions = await modelFactory.upset<Permission>(PermissionModelFactory.TAG).use(mockPermission => {
                mockPermission.app = authorisedApp;
                return mockPermission;
            }).createMany(4);

            for (const perm of permissions) {
                await modelFactory.upset<RolePermission>(RolePermissionModelFactory.TAG)
                    .use(rPermission => {
                        rPermission.role = role;
                        rPermission.permission = perm;
                        return rPermission;
                    }).create();
            }

            const response = await request(applicationContext.getHttpServer())
                .get(`/role-management/roles/${role.code}`)
                .set({
                    'X-APP-CODE': authorisedApp.code,
                    'X-APP-TOKEN': authorisedApp.token,
                    'Authorization': `Bearer ${loginToken}`
                }).expect(200);
            expect(response.body.name).toEqual(role.name);
            expect(response.body.description).toEqual(role.description);
            expect(response.body.code).toEqual(role.code);
            expect(response.body.permissions).toHaveLength(4);
            expect(response.body.permissions).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: permissions[0].name,
                        code: permissions[0].code
                    }),
                ])
            );
        }
    });

    it('Test to get all created roles', async () => {
        const existingRoleCount = await connection.getCustomRepository(RoleRepository).count({
            app: authorisedApp,
            status: GenericStatusConstant.ACTIVE
        });
        const roles = await modelFactory.upset<Role>(RoleModelFactory.TAG).use((it) => {
            it.app = authorisedApp;
            return it;
        }).createMany(5);
        await modelFactory.createMany<Role>(3, RoleModelFactory.TAG);
        const response = await request(applicationContext
            .getHttpServer())
            .get('/role-management/roles')
            .set({
                'X-APP-CODE': authorisedApp.code,
                'X-APP-TOKEN': authorisedApp.token,
                'Authorization': `Bearer ${loginToken}`
            })
            .expect(200);
        expect(response.body).toHaveLength(existingRoleCount + 5);
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: roles[0].name,
                    code: roles[0].code,
                    description: roles[0].description
                })
            ])
        );

    });
    it('Test if role is created', async () => {
        const permissions = await modelFactory.upset<Permission>(PermissionModelFactory.TAG)
            .use((it) => {
                it.app = authorisedApp;
                return it;
            }).createMany(5);
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
