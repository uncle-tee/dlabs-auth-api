import * as faker from 'faker';
import {PortalAccount} from '../entity/PortalAccount';
import {App} from '../entity/App';
import {GenericStatusConstant} from '../enums/GenericStatusConstant';

describe('Test Portal entity', () => {
    const portalAccount = new PortalAccount();
    portalAccount.accountId = faker.random.uuid();
    portalAccount.app = new App();
    portalAccount.name = faker.name.firstName();
    portalAccount.id = faker.random.number(10000);
    portalAccount.status = GenericStatusConstant.ACTIVE;

    it('test all Portal Account properties', () => {
        expect(portalAccount).toHaveProperty('accountId');
        expect(portalAccount).toHaveProperty('app');
        expect(portalAccount).toHaveProperty('name');
        expect(portalAccount).toHaveProperty('id');
        expect(portalAccount).toHaveProperty('status');
    });
});
