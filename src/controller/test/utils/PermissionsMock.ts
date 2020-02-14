/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 14/02/2020 */
import {BaseEntityMock} from './BaseEntityMock';
import {Connection, EntityManager} from 'typeorm';
import FakerStatic = Faker.FakerStatic;
import {Permission} from '../../../domain/entity/Permission';
import {ModelFactory} from './ModelFactory';
import {App} from '../../../domain/entity/App';
import {AppMock} from './AppMock';

// @ts-ignore
export class PermissionsMock extends BaseEntityMock<Permission> {

    provideEntity(faker: FakerStatic, connection): Permission {
        const permission = new Permission();
        permission.name = faker.name.firstName();
        permission.app = ModelFactory
            .getInstance(connection)
            .mockData<App, AppMock>(AppMock)
            .createOne();
        return permission;
    }

}

