import {BaseRepository} from '../d-labs-common/dao/BaseRepository';
import {Role} from '../domain/entity/Role';
import {EntityRepository} from 'typeorm';

@EntityRepository(Role)
export class RoleRepository extends BaseRepository<Role> {

}
