import {Connection} from 'typeorm';
import {App} from '../../../domain/entity/App';
import * as faker from 'faker';
import {AppRepository} from '../../../dao/AppRepository';

export class TestUtils {

    constructor(private readonly connection: Connection) {
    }

    getAuthorisedApp() {
        const app = new App();
        app.code = faker.random.uuid();
        app.token = faker.random.uuid();
        app.name = faker.name.firstName();
        return this.connection.getCustomRepository(AppRepository).save(app);
    }
}
