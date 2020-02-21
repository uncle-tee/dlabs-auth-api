/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import {FactoryHelper} from '../orm-faker/contracts/FactoryHelper';
import {Permission} from '../../domain/entity/Permission';
import {ModelFactory} from '../orm-faker/contracts/ModelFactory';
import FakerStatic = Faker.FakerStatic;
import {AppFactory} from './AppFactory';

export class PermissionModelFactory implements FactoryHelper<Permission> {

    public static TAG = 'PERMISSION';

    async apply(faker: FakerStatic, modelFactory: ModelFactory): Promise<Permission> {
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

