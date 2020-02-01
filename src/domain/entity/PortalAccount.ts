import {Column, Entity, Generated, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {App} from './App';

@Entity()
export class PortalAccount extends BaseEntity {
    @Column({
        unique: true
    })
    name: string;
    @Column(type => App)
    app: App;
    @Column({
        unique: true
    })
    accountId: string;

}
