import {Column, CreateDateColumn, ObjectID, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {GenericStatusConstant} from '../enums/GenericStatusConstant';

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: GenericStatusConstant,
        default: GenericStatusConstant.ACTIVE

    })
    status: GenericStatusConstant;
    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date;
    @UpdateDateColumn({
        type: 'timestamp'
    })
    updatedAt?: Date;
}
