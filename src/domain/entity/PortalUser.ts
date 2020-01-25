import {Column, Entity, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {GenderConstant} from '../enums/GenderConstant';
import {BaseEntity} from './BaseEntity';
import {Address} from './Address';

@Entity()
export class PortalUser extends BaseEntity {
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({
        unique: true
    })
    username: string;
    @Column({
        type: 'enum',
        enum: GenderConstant
    })
    gender: GenderConstant;
    @Column()
    password: string;
    @OneToOne(type => Address, {
        nullable: true
    })
    address: Address;
}
