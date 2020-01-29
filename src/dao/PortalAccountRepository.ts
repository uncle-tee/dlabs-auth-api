import {EntityRepository, Repository} from 'typeorm';
import {PortalAccount} from '../domain/entity/PortalAccount';
import {BaseRepository} from '../d-labs-common/dao/BaseRepository';

@EntityRepository(PortalAccount)
export class PortalAccountRepository extends BaseRepository<PortalAccount> {

}
