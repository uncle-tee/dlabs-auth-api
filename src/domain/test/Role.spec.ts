import * as faker from 'faker';

import {Role} from '../entity/Role';
import {App} from '../entity/App';

describe('Test Role Entity', () => {
    const role = new Role();
    role.app = new App();
    role.code = faker.random.uuid();
    role.name = faker.name.findName();
    role.id = faker.random.number();

    it('Test  all Role properties', () => {
        expect(role).toHaveProperty('app');
        expect(role).toHaveProperty('code');
        expect(role).toHaveProperty('name');
        expect(role).toHaveProperty('id');
    });
});
