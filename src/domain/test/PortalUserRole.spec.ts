import * as faker from 'faker';

import {Role} from '../entity/Role';
import {PortalUserRole} from '../entity/PortalUserRole';
import {PortalUser} from '../entity/PortalUser';

describe('Test Role Entity', () => {
    const portalUserRole = new PortalUserRole();
    portalUserRole.portalUser = new PortalUser();
    portalUserRole.role = new Role();
    portalUserRole.createdBy = new PortalUser();

    it('Test  all Role properties', () => {
        expect(portalUserRole).toHaveProperty('portalUser');
        expect(portalUserRole).toHaveProperty('role');
        expect(portalUserRole).toHaveProperty('createdBy');
    });
});
