import {Column, Entity, ManyToOne, ObjectID, ObjectIdColumn, OneToOne} from 'typeorm';
import {BaseEntity} from './BaseEntity';

@Entity()
export class State extends BaseEntity {
    @Column()
    name: string;
    @Column()
    code: string;

}
