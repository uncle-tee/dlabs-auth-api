import {PortalUser} from '../entity/PortalUser';
import * as faker from 'faker';
import {GenderConstant} from '../enums/GenderConstant';
import {GenericStatusConstant} from '../enums/GenericStatusConstant';
import {Address} from '../entity/Address';
import {PortalUserAccounts} from '../entity/PortalUserAccounts';
import {PortalAccount} from '../entity/PortalAccount';

describe('Test PortalUserAccount  entity', () => {
    const portalUserAccount = new PortalUserAccounts();
    portalUserAccount.portalAccount = new PortalAccount();
    portalUserAccount.portalUser = new PortalUser();

    it('Test  all portalAccountUser properties', () => {
        expect(portalUserAccount).toHaveProperty('portalAccount');
        expect(portalUserAccount).toHaveProperty('portalUser');

    });
});
