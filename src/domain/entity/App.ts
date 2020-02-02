import {Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';

@Entity()
export class App extends BaseEntity {
    @Column()
    name: string;
    @Column({
        unique: true
    })
    token: string;
    @Column({
        unique: true
    })
    code: string;

}
