/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 19/02/2020 */

import {FactoryHelper} from '../../../test-starter/orm-faker/contracts/FactoryHelper';
import {PortalAccount} from '../../../domain/entity/PortalAccount';
import {ModelFactory} from '../../../test-starter/orm-faker/contracts/ModelFactory';
import {AppFactory} from './AppFactory';
import {GenericStatusConstant} from '../../../domain/enums/GenericStatusConstant';

export class PortalAccountModelFactory implements FactoryHelper<PortalAccount> {
    public static TAG;

    async apply(faker: Faker.FakerStatic, modelFactory: ModelFactory): Promise<PortalAccount> {
        const portalAccount = new PortalAccount();
        portalAccount.app = await modelFactory.create(AppFactory.TAG);
        portalAccount.name = faker.name.firstName();
        portalAccount.accountId = faker.random.uuid();
        portalAccount.status = GenericStatusConstant.ACTIVE;
        return portalAccount;
    }

    getTag(): string {
        return PortalAccountModelFactory.TAG;
    }

}
