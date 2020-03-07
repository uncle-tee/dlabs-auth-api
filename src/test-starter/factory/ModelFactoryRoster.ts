/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */

import FakerStatic = Faker.FakerStatic;
import {ModelFactory} from '../orm-faker/contracts/ModelFactory';
import {Permission} from '../../domain/entity/Permission';
import {PermissionModelFactory} from './PermissionModelFactory';
import {App} from '../../domain/entity/App';
import {AppFactory} from './AppFactory';
import {PortalUserModelFactory} from './PortalUserModelFactory';
import {PortalUser} from '../../domain/entity/PortalUser';
import {PortalAccount} from '../../domain/entity/PortalAccount';
import {PortalAccountModelFactory} from './PortalAccountModelFactory';
import {PortalUserAccount} from '../../domain/entity/PortalUserAccount';
import {PortalUserAccountFactory} from './PortalUserAccountFactory';
import {Role} from '../../domain/entity/Role';
import {RoleModelFactory} from './RoleModelFactory';
import {RolePermission} from '../../domain/entity/RolePermission';
import {RolePermissionModelFactory} from './RolePermissionModelFactory';

export class ModelFactoryRoster {
    static register(modelFactory: ModelFactory) {
        modelFactory.register<Permission, PermissionModelFactory>(PermissionModelFactory);
        modelFactory.register<App, AppFactory>(AppFactory);
        modelFactory.register<PortalUser, PortalUserModelFactory>(PortalUserModelFactory);
        modelFactory.register<PortalAccount, PortalAccountModelFactory>(PortalAccountModelFactory);
        modelFactory.register<PortalUserAccount, PortalUserAccountFactory>(PortalUserAccountFactory);
        modelFactory.register<Role, RoleModelFactory>(RoleModelFactory);
        modelFactory.register<RolePermission, RolePermissionModelFactory>(RolePermissionModelFactory);
    }
}
