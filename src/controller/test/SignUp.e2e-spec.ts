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

describe('AppController', () => {
    let app: INestApplication;
    let connection: Connection;

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [AppService],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
        connection = getConnection();

    });

    describe('/signUp', () => {
        it('Test sign up route can sign up a user', () => {
            return request(app.getHttpServer()).post('/signUp').send(
                {
                    firstName: 'Olueatobi',
                    lastName: 'Adenekan',
                    username: 'tadenekan',
                    gender: 'MALE',
                    password: 'school'

                }
            ).expect(201);
        });

        it('Test if same user with same user name can exit', () => {
            return request(app.getHttpServer()).post('/signUp').send({
                firstName: 'Olueatobi',
                lastName: 'Adenekan',
                username: 'tadenekan',
                gender: 'MALE',
                password: 'school'

            }).expect(201);
        });

        it('Test attributes when user is created', async () => {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const response = await request(app.getHttpServer()).post('/signUp').send({
                firstName,
                lastName,
                username: firstName,
                gender: 'MALE',
                password: faker.random.uuid()
            });
            expect(response.body.username).toBe(firstName.toLowerCase());
            expect(response.body.lastName).toBe(lastName);
            expect(response.body.password).toBeNull();
            expect(response.body.gender).toBe('MALE');
            expect(response.body.firstName).toBe(firstName);
        });

    });

    afterAll(async () => {
        await app.close();

    });
});
