import {Column, Entity, ManyToOne, ObjectID, ObjectIdColumn, OneToOne} from 'typeorm';
import {Lga} from './Lga';
import {BaseEntity} from './BaseEntity';

@Entity()
export class Area extends BaseEntity {
    @Column()
    name: string;
    @Column()
    code: string;
    @ManyToOne(type => Lga)
    lga: Lga;
}
