/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 14/02/2020 */
import {Connection, EntityManager} from 'typeorm';
import FakerStatic = Faker.FakerStatic;
import {Permission} from '../../../domain/entity/Permission';
import * as faker from 'faker';

export abstract class BaseEntityMock<T> {

    private entityManager: EntityManager;
    private connection: Connection;

    async create(count: number): Promise<T[]> {
        const permissions = [];

        for (let i = 0; i < count; i++) {
            const permission = this.provideEntity(faker, this.connection);
            const createdPermission = await this.entityManager.save(permission);
            permissions.push(createdPermission);
        }

        return Promise.all(permissions);
    }

    async createOne() {
        const ts: T[] = await this.create(1);
        return ts[0];
    }

    provideConnection(connection: Connection) {
        this.connection = connection;
        this.entityManager = this.connection.createEntityManager();
    }

    abstract provideEntity(faker: FakerStatic, connection: Connection): T;
}

