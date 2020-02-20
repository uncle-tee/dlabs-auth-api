/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 20/02/2020 */
import {FactoryHelper} from '../../../test-starter/orm-faker/contracts/FactoryHelper';
import {PortalUserAccount} from '../../../domain/entity/PortalUserAccount';
import {ModelFactory} from '../../../test-starter/orm-faker/contracts/ModelFactory';
import {PortalUserModelFactory} from './PortalUserModelFactory';
import {PortalAccountModelFactory} from './PortalAccountModelFactory';

export class PortalUserAccountFactory implements FactoryHelper<PortalUserAccount> {
    public static TAG: string;

    async apply(faker: Faker.FakerStatic, modelFactory: ModelFactory): Promise<PortalUserAccount> {
        const portalUserAccount = new PortalUserAccount();
        portalUserAccount.portalAccount = await modelFactory.create(PortalAccountModelFactory.TAG);
        portalUserAccount.portalUser = await modelFactory.create(PortalUserModelFactory.TAG);
        return portalUserAccount;
    }

    getTag(): string {
        return PortalUserAccountFactory.TAG;
    }

}

