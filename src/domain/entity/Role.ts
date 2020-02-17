import {Column, Entity, ManyToOne, ObjectID, ObjectIdColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {App} from './App';
import {PortalUser} from './PortalUser';

@Entity()
export class Role extends BaseEntity {
    @Column({
        nullable: false
    })
    name: string;
    @Column({
        nullable: false
    })
    code: string;

    @ManyToOne(type => PortalUser)
    createdBy: PortalUser;
    @Column()
    description: string;

}
