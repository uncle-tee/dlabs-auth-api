import {BaseRepository} from '../d-labs-common/dao/BaseRepository';
import {Permission} from '../domain/entity/Permission';
import {EntityRepository} from 'typeorm';

@EntityRepository(Permission)
export class PermissionRepository extends BaseRepository<Permission> {

}
