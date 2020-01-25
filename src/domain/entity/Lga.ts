import {Column, Entity, ObjectID, ObjectIdColumn, OneToOne} from 'typeorm';
import {State} from './State';
import {BaseEntity} from './BaseEntity';

@Entity()
export class Lga extends BaseEntity {
    @Column()
    name: string;
    @Column()
    code: string;
    @OneToOne(type => State)
    state: State;
}
