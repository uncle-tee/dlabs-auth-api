import {Area} from '../../domain/entity/Area';
import {AppController} from '../../app.controller';
import {Test, TestingModule} from '@nestjs/testing';
import {AppService} from '../../app.service';
import {AppModule} from '../../app.module';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {getConnection} from 'typeorm';
import {Connection} from 'typeorm/connection/Connection';
import * as faker from 'faker';
import {App} from '../../domain/entity/App';
import {AppRepository} from '../../dao/AppRepository';
import {TestUtils} from './utils/TestUtils';
import {testForBuffer} from 'class-transformer/TransformOperationExecutor';
import {ModelFactory} from '../../test-starter/orm-faker/contracts/ModelFactory';
import {PortalUser} from '../../domain/entity/PortalUser';
import {AppFactory} from '../../test-starter/factory/AppFactory';
import {PortalUserModelFactory} from '../../test-starter/factory/PortalUserModelFactory';
import {PortalUserAccount} from '../../domain/entity/PortalUserAccount';
import {PortalAccount} from '../../domain/entity/PortalAccount';
import {PortalAccountModelFactory} from '../../test-starter/factory/PortalAccountModelFactory';

describe('AuthController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let authorisedApp: App;
    let modelFactory: ModelFactory;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AppService],
        }).compile();

        applicationContext = moduleRef.createNestApplication();
        await applicationContext.init();
        connection = getConnection();
        testUtils = TestUtils.getInstance(connection);
        modelFactory = testUtils.initModelFactory();
        authorisedApp = await testUtils.getAuthorisedApp();

    });

    it('Test sign up route can sign up a user', async () => {
        await request(applicationContext.getHttpServer())
            .post('/signUp')
            .set({
                'X-APP-CODE': authorisedApp.code,
                'X-APP-TOKEN': authorisedApp.token,
                'Authorisation': authorisedApp.token
            })
            .send(
                {
                    firstName: 'Olueatobi',
                    lastName: 'Adenekan',
                    username: 'tadenekan',
                    gender: 'MALE',
                    password: 'school',
                    phoneNumber: faker.phone.phoneNumber(),
                    email: faker.internet.email()

                }
            ).expect(201);
    });

    it('Test that a username with same emaail or user name cannot exist on the same app', async () => {
        await request(applicationContext.getHttpServer())
            .post('/signUp')
            .set({
                'X-APP-CODE': authorisedApp.code,
                'X-APP-TOKEN': authorisedApp.token,
                'Authorisation': authorisedApp.token
            })
            .send({
                firstName: 'Olueatobi',
                lastName: 'Adenekan',
                username: 'tadenekan',
                gender: 'MALE',
                password: 'school',
                phoneNumber: faker.phone.phoneNumber(),
                email: faker.internet.email()
            }).expect(409);
    });

    it('Test attributes when user is created', async () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = faker.internet.email(firstName, lastName);
        const phoneNumber = faker.phone.phoneNumber();
        const response = await request(applicationContext.getHttpServer())
            .post('/signUp')
            .set({
                'X-APP-CODE': authorisedApp.code,
                'X-APP-TOKEN': authorisedApp.token,
                'Authorisation': authorisedApp.token
            }).send({
                firstName,
                lastName,
                email,
                username: firstName,
                phoneNumber,
                gender: 'MALE',
                password: faker.random.uuid()
            });
        expect(response.body.username).toBe(firstName.toLowerCase());
        expect(response.body.lastName).toBe(lastName);
        expect(response.body.password).toBeNull();
        expect(response.body.gender).toBe('MALE');
        expect(response.body.email).toBe(email.toLowerCase());
        expect(response.body.phoneNumber).toBe(phoneNumber);
        expect(response.body.firstName).toBe(firstName);
    });

    it('Test that only one unique username or password can exist on an app', async () => {

        const users: PortalUser[] = [];
        const portalAccounts = await modelFactory
            .upset<PortalAccount>(PortalAccountModelFactory.TAG)
            .use(pAccount => {
                pAccount.app = authorisedApp;
                return pAccount;
            })
            .createMany(3);

        for (const portalAccount of portalAccounts) {
            const user = await modelFactory
                .upset<PortalUser>(PortalUserModelFactory.TAG)
                .use(pUser => {
                    pUser.username = portalAccount.name;
                    return pUser;
                }).create();
            await modelFactory
                .upset<PortalUserAccount>(PortalUserModelFactory.TAG)
                .use((pUserAccount) => {
                    pUserAccount.portalUser = user;
                    pUserAccount.portalAccount = portalAccount;
                    return pUserAccount;
                })
                .create();
            users.push(user);
        }

        for (const pUser of users) {
            await request(applicationContext.getHttpServer())
                .post('/signup')
                .set({
                    'X-APP-CODE': authorisedApp.code,
                    'X-APP-TOKEN': authorisedApp.token,
                })
                .send(
                    {
                        firstName: pUser.firstName,
                        lastName: pUser.lastName,
                        username: pUser.username,
                        gender: pUser.gender,
                        password: faker.random.alphaNumeric(10),
                        phoneNumber: faker.phone.phoneNumber(),
                        email: pUser.email
                    }
                )
                .expect(409);
        }

    });





    afterAll(async () => {
        await connection.close();
        await applicationContext.close();

    });
});
