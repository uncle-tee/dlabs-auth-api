/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 14/02/2020 */
import {Connection, EntityManager} from 'typeorm';
import {PermissionsMock} from './PermissionsMock';
import {ClassInstanceFactory} from './ClassInstanceFactory';
import {BaseEntityMock} from './BaseEntityMock';

export class ModelFactory {
    private static instance: ModelFactory = null;

    private constructor(private connection: Connection) {

    }

    static getInstance(connection: Connection): ModelFactory {
        if (this.instance == null) {
            this.instance = new ModelFactory(connection);
        }
        return this.instance;
    }

    mockData<Entity, Mocker extends BaseEntityMock<Entity>>(type: (new () => Mocker)): Mocker {
        const mocker = new type();
        mocker.provideConnection(this.connection);
        return mocker;
    }

}

