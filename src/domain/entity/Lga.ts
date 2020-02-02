import {Column, Entity, ManyToOne, ObjectID, ObjectIdColumn, OneToOne} from 'typeorm';
import {State} from './State';
import {BaseEntity} from './BaseEntity';

@Entity()
export class Lga extends BaseEntity {
    @Column()
    name: string;
    @Column()
    code: string;
    @ManyToOne(type => State)
    state: State;
}
