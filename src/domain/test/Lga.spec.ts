import {count} from 'rxjs/operators';
import * as faker from 'faker';
import {Lga} from '../entity/Lga';
import {State} from '../entity/State';

describe('Test Lga entity', () => {
    const lga = new Lga();
    lga.code = faker.random.uuid();
    lga.id = faker.random.number();
    lga.name = faker.address.county();
    lga.state = new State();

    it('test all Country properties', () => {
        expect(lga).toHaveProperty('code');
        expect(lga).toHaveProperty('state');
        expect(lga).toHaveProperty('name');
        expect(lga).toHaveProperty('id');
    });
});
