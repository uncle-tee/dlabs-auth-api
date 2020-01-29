import {EntityRepository, Repository} from 'typeorm';
import {PortalUser} from '../domain/entity/PortalUser';
import {BaseRepository} from '../d-labs-common/dao/BaseRepository';

@EntityRepository(PortalUser)
export class PortalUserRepository extends BaseRepository<PortalUser> {

}
