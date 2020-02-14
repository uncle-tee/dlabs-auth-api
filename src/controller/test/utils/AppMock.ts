/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 14/02/2020 */
import {BaseEntityMock} from './BaseEntityMock';
import {App} from '../../../domain/entity/App';
import {Connection} from 'typeorm';

export class AppMock extends BaseEntityMock<App> {
    provideEntity(faker: Faker.FakerStatic, connection: Connection): App {
        const app = new App();
        app.code = faker.random.uuid();
        app.token = faker.name.firstName();
        app.name = faker.name.firstName();
        return app;
    }

}

