import {Column, Entity, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {App} from './App';

@Entity()
export class PortalAccount extends BaseEntity {
    @Column()
    name: string;
    @OneToOne(type => App)
    app: App;
    @Column()
    accountId: string;

}
