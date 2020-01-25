import {Column, Entity, ManyToOne} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {Role} from './Role';
import {Permission} from './Permission';

@Entity()
export class RolePermission extends BaseEntity {

    @ManyToOne(type => Role)
    role: Role;

    @ManyToOne(type => Permission)
    permission: Permission;
}
