import {App} from '../entity/App';
import * as faker from 'faker';
import {GenericStatusConstant} from '../enums/GenericStatusConstant';

describe('App Entity', () => {
    const app = new App();
    app.token = faker.random.uuid();
    app.name = faker.name.firstName();
    app.status = GenericStatusConstant.ACTIVE;
    app.id = faker.random.number(100);
    it('Test all properties of APP', () => {
        expect(app).toHaveProperty('token');
        expect(app).toHaveProperty('name');
        expect(app).toHaveProperty('status');
        expect(app).toHaveProperty('id');
    });
});
