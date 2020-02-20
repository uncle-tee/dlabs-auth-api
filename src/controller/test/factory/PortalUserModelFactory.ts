/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 19/02/2020 */
import {FactoryHelper} from '../../../test-starter/orm-faker/contracts/FactoryHelper';
import {PortalUser} from '../../../domain/entity/PortalUser';
import {ModelFactory} from '../../../test-starter/orm-faker/contracts/ModelFactory';
import {GenericStatusConstant} from '../../../domain/enums/GenericStatusConstant';
import {GenderConstant} from '../../../domain/enums/GenderConstant';

export class PortalUserModelFactory implements FactoryHelper<PortalUser> {
    public static TAG: string;

    async apply(faker: Faker.FakerStatic, modelFactory: ModelFactory): Promise<PortalUser> {
        const portalUser = new PortalUser();
        portalUser.firstName = faker.name.firstName();
        portalUser.lastName = faker.name.lastName();
        portalUser.username = `${faker.name.firstName()}${faker.random.number()}`;
        portalUser.password = faker.random.uuid();
        portalUser.gender = GenderConstant.FEMALE;
        portalUser.email = faker.internet.email();
        portalUser.phoneNumber = faker.phone.phoneNumber();
        portalUser.status = GenericStatusConstant.ACTIVE;
        return portalUser;
    }

    getTag(): string {
        return PortalUserModelFactory.TAG;
    }

}
