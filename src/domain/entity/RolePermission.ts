import {Column, Entity, ManyToOne} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {Role} from './Role';
import {Permission} from './Permission';

@Entity()
export class RolePermission extends BaseEntity {

    @ManyToOne(type => Role, {
        nullable: false
    })
    role: Role;

    @ManyToOne(type => Permission, {
        nullable: false
    })
    permission: Permission;
}
