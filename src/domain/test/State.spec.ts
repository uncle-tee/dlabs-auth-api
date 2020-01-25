import * as faker from 'faker';
import {State} from '../entity/State';
import {Country} from '../entity/Country';

describe('Test State Entity', () => {
    const state = new State();
    state.code = faker.random.uuid();
    state.country = new Country();
    state.name = faker.address.city();
    state.id = faker.random.number();

    it('Test  all State properties', () => {
        expect(state).toHaveProperty('code');
        expect(state).toHaveProperty('country');
        expect(state).toHaveProperty('name');
        expect(state).toHaveProperty('id');
    });
});
