import {PortalUser} from '../entity/PortalUser';
import * as faker from 'faker';
import {GenderConstant} from '../enums/GenderConstant';
import {GenericStatusConstant} from '../enums/GenericStatusConstant';
import {Address} from '../entity/Address';

describe('Test Portal User  entity', () => {
    const portalUser = new PortalUser();
    portalUser.firstName = faker.name.firstName();
    portalUser.lastName = faker.name.lastName();
    portalUser.gender = GenderConstant.FEMALE;
    portalUser.password = faker.random.alphaNumeric();
    portalUser.username = faker.name.findName();
    portalUser.status = GenericStatusConstant.ACTIVE;
    portalUser.id = faker.random.number(100000000);
    portalUser.address = new Address();

    it('Test  all portal user properties', () => {
        expect(portalUser).toHaveProperty('firstName');
        expect(portalUser).toHaveProperty('lastName');
        expect(portalUser).toHaveProperty('gender');
        expect(portalUser).toHaveProperty('password');
        expect(portalUser).toHaveProperty('username');
        expect(portalUser).toHaveProperty('status');
        expect(portalUser).toHaveProperty('id');
        expect(portalUser).toHaveProperty('address');
    });
});
