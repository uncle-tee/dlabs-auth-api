/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */

import FakerStatic = Faker.FakerStatic;
import {ModelFactory} from '../../typeOrmFaker/contracts/ModelFactory';
import {Permission} from '../../../../domain/entity/Permission';
import {PermissionModelFactory} from './PermissionModelFactory';
import {App} from '../../../../domain/entity/App';
import {AppFactory} from './AppFactory';

export class ModelFactoryRoster {
    static register(modelFactory: ModelFactory) {
        modelFactory.register<Permission, PermissionModelFactory>(PermissionModelFactory);
        modelFactory.register<App, AppFactory>(AppFactory);
    }
}
