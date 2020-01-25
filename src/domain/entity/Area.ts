import {Column, Entity, ObjectID, ObjectIdColumn, OneToOne} from 'typeorm';
import {Lga} from './Lga';
import {BaseEntity} from './BaseEntity';

@Entity()
export class Area extends BaseEntity {
    @Column()
    name: string;
    @Column()
    code: string;
    @OneToOne(type => Lga)
    lga: Lga;
}
