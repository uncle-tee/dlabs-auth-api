import {BaseRepository} from '../d-labs-common/dao/BaseRepository';
import {Permission} from '../domain/entity/Permission';
import {EntityRepository} from 'typeorm';
import {GenericStatusConstant} from '../domain/enums/GenericStatusConstant';
import {App} from '../domain/entity/App';

@EntityRepository(Permission)
export class PermissionRepository extends BaseRepository<Permission> {
    findByCodeIn(permissionCodes: string[], app: App) {
        return this.createQueryBuilder('permission')
            .select()
            .where('permission.code IN (:...codes)')
            .andWhere('permission.status = :status')
            .andWhere('permission.app.id = :appId')
            .setParameter('status', GenericStatusConstant.ACTIVE)
            .setParameter('appId', app.id)
            .setParameter('codes', permissionCodes)
            .getMany();
    }
}
