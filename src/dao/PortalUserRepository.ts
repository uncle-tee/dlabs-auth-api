import {EntityRepository, Repository} from 'typeorm';
import {PortalUser} from '../domain/entity/PortalUser';

@EntityRepository(PortalUser)
export class PortalUserRepository extends Repository<PortalUser> {

}
