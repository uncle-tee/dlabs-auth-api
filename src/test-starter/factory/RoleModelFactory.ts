/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 07/03/2020 */
import {FactoryHelper} from '../orm-faker/contracts/FactoryHelper';
import {Role} from '../../domain/entity/Role';
import {ModelFactory} from '../orm-faker/contracts/ModelFactory';
import {AppFactory} from './AppFactory';

export class RoleModelFactory implements FactoryHelper<Role> {
    public static TAG = 'Role';

    async apply(faker: Faker.FakerStatic, modelFactory: ModelFactory): Promise<Role> {
        const role = new Role();
        role.code = faker.random.alphaNumeric(10);
        role.name = faker.name.firstName();
        role.description = faker.random.words(10);
        role.app = await modelFactory.create(AppFactory.TAG);
        return role;
    }

    getTag(): string {
        return RoleModelFactory.TAG;
    }

}

