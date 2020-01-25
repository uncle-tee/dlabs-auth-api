import * as faker from 'faker';
import {Permission} from '../entity/Permission';

describe('Test Permission entity', () => {
    const permission = new Permission();
    permission.code = faker.random.uuid();
    permission.name = faker.name.firstName();
    permission.id = faker.random.number();

    it('test all Permission properties', () => {
        expect(permission).toHaveProperty('code');
        expect(permission).toHaveProperty('name');
        expect(permission).toHaveProperty('id');
    });
});
