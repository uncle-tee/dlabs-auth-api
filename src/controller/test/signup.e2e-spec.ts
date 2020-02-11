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

describe('AppController', () => {
    let applicationContext: INestApplication;
    let connection: Connection;
    let testUtils: TestUtils;
    let appHeader: App;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AppService],
        }).compile();

        applicationContext = moduleRef.createNestApplication();
        await applicationContext.init();
        connection = getConnection();
        testUtils = new TestUtils(connection);
        appHeader = await testUtils.getAuthorisedApp();

    });

    it('Test sign up route can sign up a user', async () => {
        await request(applicationContext.getHttpServer())
            .post('/signUp')
            .set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
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

    it('Test if same user with same user name can exit', async () => {
      await  request(applicationContext.getHttpServer())
            .post('/signUp')
            .set({
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
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
                'X-APP-CODE': appHeader.code,
                'X-APP-TOKEN': appHeader.token,
                'Authorisation': appHeader.token
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
        expect(response.body.email).toBe(email);
        expect(response.body.phoneNumber).toBe(phoneNumber);
        expect(response.body.firstName).toBe(firstName);
    });

    afterAll(async () => {
        await connection.close();
        await applicationContext.close();


    });
});
