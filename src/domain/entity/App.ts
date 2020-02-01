import {Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';

@Entity()
export class App extends BaseEntity {
    @Column()
    name: string;
    @Column()
    token: string;

}
