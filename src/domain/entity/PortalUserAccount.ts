import {Column, Entity, ManyToOne} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {PortalAccount} from './PortalAccount';
import {PortalUser} from './PortalUser';

@Entity()
export class PortalUserAccount extends BaseEntity {

    @ManyToOne(type => PortalAccount)
    portalAccount: PortalAccount;

    @ManyToOne(type => PortalUser)
    portalUser: PortalUser;
}
