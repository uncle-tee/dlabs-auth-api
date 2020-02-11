import {Column, Entity, ManyToOne, ObjectID, ObjectIdColumn} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {App} from './App';

@Entity()
export class Permission extends BaseEntity {
    @Column({
        nullable: false
    })
    name: string;
    @Column({
        nullable: false
    })
    code: string;
    @ManyToOne(type => App, {nullable: false})
    app: App;

}
