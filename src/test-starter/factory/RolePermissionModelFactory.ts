/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 07/03/2020 */
import {FactoryHelper} from '../orm-faker/contracts/FactoryHelper';
import {RolePermission} from '../../domain/entity/RolePermission';
import {ModelFactory} from '../orm-faker/contracts/ModelFactory';
import {PermissionModelFactory} from './PermissionModelFactory';
import {RoleModelFactory} from './RoleModelFactory';

export class RolePermissionModelFactory implements FactoryHelper<RolePermission> {
    public static TAG = 'RolePermission';

    async apply(faker: Faker.FakerStatic, modelFactory: ModelFactory): Promise<RolePermission> {
        const rolePermission = new RolePermission();
        rolePermission.permission = await modelFactory.create(PermissionModelFactory.TAG);
        rolePermission.role = await modelFactory.create(RoleModelFactory.TAG);
        return rolePermission;
    }

    getTag(): string {
        return RolePermissionModelFactory.TAG;
    }

}

