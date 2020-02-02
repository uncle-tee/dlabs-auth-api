import {Column, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
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
        type: 'text'
    })
    gender: GenderConstant;
    @Column()
    password: string;
    @OneToOne(type => Address, {
        nullable: true
    })
    @JoinColumn()
    address: Address;
    @Column()
    email: string;
    @Column()
    phoneNumber: string;
}
