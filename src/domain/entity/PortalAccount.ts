import {Column, Entity, Generated, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {App} from './App';

@Entity()
export class PortalAccount extends BaseEntity {
    @Column({
        unique: true
    })
    name: string;
    @ManyToOne(type => App)
    app: App;
    @Column({
        unique: true
    })
    accountId: string;

}
