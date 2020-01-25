import {Area} from '../entity/Area';
import {Lga} from '../entity/Lga';
import * as faker from 'faker';

describe('Test Area Entity', () => {
    const area = new Area();
    area.name = faker.address.city();
    area.code = faker.random.uuid();
    area.lga = new Lga();
    it('Test all properties of area', () => {
        expect(area).toHaveProperty('name');
        expect(area).toHaveProperty('code');
        expect(area).toHaveProperty('lga');
    });
});
