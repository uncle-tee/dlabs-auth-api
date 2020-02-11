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

    afterAll(async () => {
        await connection.close();
        await applicationContext.close();


    });
});
