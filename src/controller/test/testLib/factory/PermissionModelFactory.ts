/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import {FactoryHelper} from '../contracts/FactoryHelper';
import {Permission} from '../../../../domain/entity/Permission';
import {ModelFactory} from '../contracts/ModelFactory';
import FakerStatic = Faker.FakerStatic;
import {AppFactory} from './AppFactory';
import {App} from '../../../../domain/entity/App';

export class PermissionModelFactory implements FactoryHelper<Permission> {

    public static TAG = 'Permission';

    // @ts-ignore
    async apply(faker: FakerStatic, modelFactory: ModelFactory): Permission {
        const permission = new Permission();
        permission.name = faker.name.firstName();
        permission.code = faker.random.uuid();
        permission.app = await modelFactory.create(AppFactory.TAG);
        return permission;
    }

    getTag(): string {
        return PermissionModelFactory.TAG;
    }

}

