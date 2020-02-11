import {PortalUser} from './PortalUser';
import {Role} from './Role';
import {Entity, ManyToOne} from 'typeorm';
import {BaseEntity} from './BaseEntity';

@Entity()
export class PortalUserRole extends BaseEntity {
    @ManyToOne(type => PortalUser)
    portalUser: PortalUser;
    @ManyToOne(type => Role)
    role: Role;
    @ManyToOne(type => PortalUser)
    createdBy: PortalUser;

}
