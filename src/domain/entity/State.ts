import {Column, Entity, ObjectID, ObjectIdColumn, OneToOne} from 'typeorm';
import {Country} from './Country';
import {BaseEntity} from './BaseEntity';

@Entity()
export class State extends BaseEntity {
    @Column()
    name: string;
    @Column()
    code: string;
    @OneToOne(type => Country)
    country: Country;

}
