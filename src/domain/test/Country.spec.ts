import {Country} from '../entity/Country';
import {count} from 'rxjs/operators';
import * as faker from 'faker';

describe('Test Country entity', () => {
    const country = new Country();
    country.code = faker.random.uuid();
    country.dialingCode = faker.address.zipCode();
    country.name = faker.address.country();
    it('test all Country properties', () => {
        expect(country).toHaveProperty('code');
        expect(country).toHaveProperty('dialingCode');
        expect(country).toHaveProperty('name');
    });
});
