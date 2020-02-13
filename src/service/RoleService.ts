import {Injectable} from '@nestjs/common';
import {RoleDto} from '../dto/rolesAndPermission/RoleDto';
import {Principal} from '../conf/security/requestPrincipal/Principal';
import {Connection} from 'typeorm';
import {RoleCodeSequenceGenerator} from '../core/sequenceGenerators/RoleCodeSequenceGenerator';
import {Role} from '../domain/entity/Role';
import {Permission} from '../domain/entity/Permission';
import {PermissionRepository} from '../dao/PermissionRepository';
import {RolePermission} from '../domain/entity/RolePermission';

@Injectable()
export class RoleService {

    constructor(private readonly connection: Connection,
                private readonly roleCodeSequenceGenerator: RoleCodeSequenceGenerator) {
    }

    public async createRole(roleDto: RoleDto, requestPrincipal: Principal) {
        return this.connection.transaction(async (entityManager) => {
            const permissions = await entityManager.getCustomRepository(PermissionRepository)
                .findByCodeIn(roleDto.permissionCodes);
            const role = new Role();
            role.name = roleDto.name;
            role.code = await this.roleCodeSequenceGenerator.next();
            role.createdBy = requestPrincipal.portalUser;
            const newRole = await entityManager.save(role);
            return permissions.map(permission => {
                const rolePermission = new RolePermission();
                rolePermission.role = role;
                rolePermission.permission = permission;
                return entityManager.save(rolePermission);
            });

        });

    }
}
