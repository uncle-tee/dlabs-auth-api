import {Address} from '../entity/Address';
import * as faker from 'faker';
import {GenericStatusConstant} from '../enums/GenericStatusConstant';
import {Area} from '../entity/Area';

describe('Address Entity', () => {
    const address = new Address();
    address.houseNumber = faker.random.number(100).toString();
    address.latitude = faker.address.latitude();
    address.longitude = faker.address.longitude();
    address.status = GenericStatusConstant.ACTIVE;
    address.id = faker.random.number(50);
    address.area = new Area();

    it('Test if address entity has attribute', () => {
        expect(address).toHaveProperty('houseNumber');
        expect(address).toHaveProperty('latitude');
        expect(address).toHaveProperty('longitude');
        expect(address).toHaveProperty('status');
        expect(address).toHaveProperty('id');
        expect(address).toHaveProperty('area');
    });

});

