import {BaseRepository} from '../d-labs-common/dao/BaseRepository';
import {Permission} from '../domain/entity/Permission';
import {EntityRepository} from 'typeorm';
import {GenericStatusConstant} from '../domain/enums/GenericStatusConstant';
import {App} from '../domain/entity/App';
import {Role} from '../domain/entity/Role';
import {RolePermission} from '../domain/entity/RolePermission';
import {PortalUserAccount} from '../domain/entity/PortalUserAccount';
import {PortalAccount} from '../domain/entity/PortalAccount';

@EntityRepository(Permission)
export class PermissionRepository extends BaseRepository<Permission> {
    async findByCodeIn(permissionCodes: string[], app: App): Promise<Permission[]> {
        return await this.createQueryBuilder('permission')
            .select()
            .where('permission.code IN (:...codes)')
            .andWhere('permission.status = :status')
            .andWhere('permission.app.id = :appId')
            .setParameter('status', GenericStatusConstant.ACTIVE)
            .setParameter('appId', app.id)
            .setParameter('codes', permissionCodes)
            .getMany();
    }

    async findByRoles(roles: Role[], app: App, status: GenericStatusConstant): Promise<Permission[]> {
        return await this.createQueryBuilder('perm')
            .select()
            .innerJoin(RolePermission, 'rolePerm', 'rolePerm.permission=perm.id')
            .where('rolePerm.role.id IN (:...roleIds)')
            .andWhere('perm.status=:status')
            .andWhere('perm.app.id=:app')
            .setParameter('roleIds', roles.map(role => role.id))
            .setParameter('app', app.id)
            .setParameter('status', status)
            .getMany();
    }

    async findByRole(role: Role, app: App, status: GenericStatusConstant): Promise<Permission[]> {
        return await this.findByRoles([role], app, status);
    }
}
