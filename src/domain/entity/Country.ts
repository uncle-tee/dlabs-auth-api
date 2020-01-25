import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';

@Entity()
export class Country extends BaseEntity {
    @Column()
    name: string;
    @Column()
    code: string;
    @Column()
    dialingCode: string;
}
