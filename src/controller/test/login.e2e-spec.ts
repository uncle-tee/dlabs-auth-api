import {INestApplication} from '@nestjs/common';
import {Connection} from 'typeorm/connection/Connection';
import {TestUtils} from './utils/TestUtils';
import {App} from '../../domain/entity/App';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../app.module';
import {AppService} from '../../app.service';
import {getConnection} from 'typeorm';
import * as request from 'supertest';
import * as faker from 'faker';
import {PortalUserDto} from '../../dto/portalUser/PortalUserDto';
import {ServiceModule} from '../../service/service.module';
import {AuthenticationService} from '../../service/AuthenticationService';
import {AuthenticationInterceptor} from '../../conf/security/interceptors/AuthenticationInterceptor.service';
import {MockAuthenticationInterceptor} from '../../test-starter/mocks/MockAuthenticationInterceptor';
import {GenericStatusConstant} from '../../domain/enums/GenericStatusConstant';

describe('AppController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let appHeader: App;
    let signedUpUser: PortalUserDto;
    let authenticationService: AuthenticationService;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AppService],
        }).compile();

        applicationContext = moduleRef.createNestApplication();
        connection = getConnection();
        authenticationService = applicationContext.select(ServiceModule).get(AuthenticationService, {strict: true});
        await applicationContext.init();
        testUtils = new TestUtils(connection);
        appHeader = await testUtils.getAuthorisedApp();
        signedUpUser = await testUtils.mockSignUpUser(authenticationService, appHeader);

    });

    it('Test that user can login with right details', async () => {
        await request(applicationContext.getHttpServer())
            .post('/login')
            .set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
            })
            .send(
                {
                    username: signedUpUser.username,
                    password: signedUpUser.password,

                }
            ).expect(201);
    });

    it('Test that Authorised user cannot log in', async () => {
        await request(applicationContext.getHttpServer())
            .post('/login')
            .set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
            })
            .send(
                {
                    username: faker.name.firstName(),
                    password: faker.random.uuid(),

                }
            ).expect(401);
    });

    it('Test a user user can login with password', () => {
        return request(applicationContext.getHttpServer())
            .post('/login')
            .set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
            }).send({
                username: signedUpUser.email,
                password: signedUpUser.password,
            }).expect(200);
    });

    it('Test that a logged in user can get is full information', async () => {
        const response = await request(applicationContext.getHttpServer())
            .post('/me').set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
            }).send({
                username: signedUpUser.username,
                password: signedUpUser.password,
            });
        expect(response.body.portalUser.firstName).toEqual(signedUpUser.firstName);
        expect(response.body.portalUser.lastName).toEqual(signedUpUser.lastName);
        expect(response.body.portalUser.gender).toEqual(signedUpUser.gender);
        expect(response.body.portalUser.username).toEqual(signedUpUser.username);
        expect(response.body.portalUser.email).toEqual(signedUpUser.email);
        expect(response.body.portalUser.phoneNumber).toEqual(signedUpUser.phoneNumber);
        expect(response.body.portalUser.status).toEqual(GenericStatusConstant.ACTIVE);
    });

    it('Test That when a deactivated user is called from /me returns 404', () => {
        return request(applicationContext.getHttpServer())
            .post('/me').set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
            }).send({
                username: signedUpUser.username,
                password: signedUpUser.password,
            }).expect(404);
    });

    afterAll(async () => {
        await connection.close();
        await applicationContext.close();

    });
});
