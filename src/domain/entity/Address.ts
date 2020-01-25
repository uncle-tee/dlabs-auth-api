import {Column, Entity, ObjectID, ObjectIdColumn, OneToOne} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {Area} from './Area';

@Entity()
export class Address extends BaseEntity {
    @Column()
    houseNumber: string;
    @Column()
    longitude: string;
    @Column()
    latitude: string;
    @OneToOne(type => Area)
    area: Area;
}
