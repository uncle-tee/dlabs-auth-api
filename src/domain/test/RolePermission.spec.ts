import * as faker from 'faker';
import {RolePermission} from '../entity/RolePermission';
import {Permission} from '../entity/Permission';
import {Role} from '../entity/Role';

describe('Test RolePermission Entity', () => {
    const rolePermission = new RolePermission();
    rolePermission.permission = new Permission();
    rolePermission.role = new Role();
    rolePermission.id = faker.random.number();

    it('Test  all RolePermission properties', () => {
        expect(rolePermission).toHaveProperty('permission');
        expect(rolePermission).toHaveProperty('role');
        expect(rolePermission).toHaveProperty('id');
    });
});
