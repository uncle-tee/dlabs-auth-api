import {Column, Entity, ManyToOne, ObjectID, ObjectIdColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {App} from './App';

@Entity()
export class Role extends BaseEntity {
    @Column()
    name: string;
    @Column()
    code: string;
}
