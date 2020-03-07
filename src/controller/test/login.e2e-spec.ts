import {INestApplication} from '@nestjs/common';
import {Connection} from 'typeorm/connection/Connection';
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
import {GenericStatusConstant} from '../../domain/enums/GenericStatusConstant';
import {TestUtils} from './utils/TestUtils';
import {AppFactory} from '../../test-starter/factory/AppFactory';
import {ModelFactory} from '../../test-starter/orm-faker/contracts/ModelFactory';

describe('AuthController(Login)', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let authApp: App;
    let signedUpUser: PortalUserDto;
    let authenticationService: AuthenticationService;
    let modelFactory: ModelFactory;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AppService],
        }).compile();

        applicationContext = moduleRef.createNestApplication();
        connection = getConnection();
        authenticationService = applicationContext.select(ServiceModule).get(AuthenticationService, {strict: true});
        await applicationContext.init();
        testUtils = TestUtils.getInstance(connection);
        authApp = await testUtils.getAuthorisedApp();
        modelFactory = testUtils.initModelFactory();
        signedUpUser = await testUtils.mockSignUpUser(authenticationService, authApp);

    });

    it('Test that user can login with right details', async () => {
        await request(applicationContext.getHttpServer())
            .post('/login')
            .set({
                'X-APP-CODE': authApp.code,
                'X-APP-TOKEN': authApp.token,
                'Authorisation': authApp.token
            })
            .send(
                {
                    username: signedUpUser.username,
                    password: signedUpUser.password,

                }
            ).expect(201);
    });

    it('Test that Authorised user cannot log in with wrong details', async () => {
        await request(applicationContext.getHttpServer())
            .post('/login')
            .set({
                'X-APP-CODE': authApp.code,
                'X-APP-TOKEN': authApp.token,
                'Authorisation': authApp.token
            })
            .send(
                {
                    username: faker.name.firstName(),
                    password: faker.random.uuid(),

                }
            ).expect(401);
    });

    it('Test a user user can login with email and  password', () => {
        return request(applicationContext.getHttpServer())
            .post('/login')
            .set({
                'X-APP-CODE': authApp.code,
                'X-APP-TOKEN': authApp.token
            }).send({
                username: signedUpUser.email,
                password: signedUpUser.password,
            }).expect(201);
    });

    it('Test that are user can login in with username and password', () => {
        return request(applicationContext.getHttpServer()).post('/login')
            .set({
                'X-APP-CODE': authApp.code,
                'X-APP-TOKEN': authApp.token
            }).send({
                username: signedUpUser.username,
                password: signedUpUser.password,
            })
            .expect(201);
    });

    it('Test that a logged in user can get is full information', async () => {
        const authToken = await TestUtils.getInstance(connection).mockLoginUser(authenticationService, authApp);
        const response = await request(applicationContext.getHttpServer())
            .get('/me').set({
                'X-APP-CODE': authApp.code,
                'X-APP-TOKEN': authApp.token,
                'Authorization': `Bearer ${authToken}`
            });
        expect(response.body.portalUser.firstName).toEqual(signedUpUser.firstName);
        expect(response.body.portalUser.lastName).toEqual(signedUpUser.lastName);
        expect(response.body.portalUser.gender).toEqual(signedUpUser.gender.toString());
        expect(response.body.portalUser.username).toEqual(signedUpUser.username.toLowerCase());
        expect(response.body.portalUser.email).toEqual(signedUpUser.email.toLowerCase());
        expect(response.body.portalUser.phoneNumber).toEqual(signedUpUser.phoneNumber);
        expect(response.body.portalUser.status).toEqual(GenericStatusConstant.ACTIVE);
    });

    it('Test That when a deactivated user is called from /me returns 404', () => {
        return request(applicationContext.getHttpServer())
            .post('/me').set({
                'X-APP-CODE': authApp.code,
                'X-APP-TOKEN': authApp.token,
                'Authorisation': authApp.token
            }).expect(404);
    });

    it('Test that a portal user cannot login with the another app credentials', async () => {

        const app = await modelFactory.create<App>(AppFactory.TAG);
        const portalUser = await testUtils
            .mockNewSignUpUser(authenticationService, app);
        return request(applicationContext.getHttpServer())
            .post('/login')
            .set({
                'X-APP-CODE': authApp.code,
                'X-APP-TOKEN': authApp.token
            }).send({
                username: portalUser.username,
                password: portalUser.password,
            }).expect(401);
    });



    afterAll(async () => {
        await connection.close();
        await applicationContext.close();

    });
});
