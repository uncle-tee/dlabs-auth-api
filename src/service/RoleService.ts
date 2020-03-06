import {BadRequestException, Injectable} from '@nestjs/common';
import {RoleDto} from '../dto/rolesAndPermission/RoleDto';
import {Principal} from '../conf/security/requestPrincipal/Principal';
import {Connection} from 'typeorm';
import {RoleCodeSequenceGenerator} from '../core/sequenceGenerators/RoleCodeSequenceGenerator';
import {Role} from '../domain/entity/Role';
import {Permission} from '../domain/entity/Permission';
import {PermissionRepository} from '../dao/PermissionRepository';
import {RolePermission} from '../domain/entity/RolePermission';
import {App} from '../domain/entity/App';

@Injectable()
export class RoleService {

    constructor(private readonly connection: Connection,
                private readonly roleCodeSequenceGenerator: RoleCodeSequenceGenerator) {
    }

    public async createRole(roleDto: RoleDto, requestPrincipal: Principal, app: App) {
        return this.connection.transaction(async (entityManager) => {
            const permissions = await entityManager.getCustomRepository(PermissionRepository)
                .findByCodeIn(roleDto.permissionCodes, app);
            if (!permissions.length) {
                throw new BadRequestException('At least one permission must be provided');
            }
            const role = new Role();
            role.name = roleDto.name;
            role.code = await this.roleCodeSequenceGenerator.next();
            role.description = roleDto.description;
            role.app = app;
            role.createdBy = requestPrincipal.portalUser;
            const newRole = await entityManager.save(role);
            return permissions.map(permission => {
                const rolePermission = new RolePermission();
                rolePermission.role = newRole;
                rolePermission.permission = permission;
                return entityManager.save(rolePermission);
            });

        });

    }
}
