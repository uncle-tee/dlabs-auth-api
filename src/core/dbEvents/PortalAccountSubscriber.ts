import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from 'typeorm';
import {PortalAccount} from '../../domain/entity/PortalAccount';
import {PortalAccountRepository} from '../../dao/PortalAccountRepository';
import {zeroFills} from '../../d-labs-common/UsefulUtils';

@EventSubscriber()
export class PortalAccountSubscriber implements EntitySubscriberInterface<PortalAccount> {

    afterInsert(event: InsertEvent<PortalAccount>): Promise<any> | void {
        const portalAccountRepo = event.manager.connection.getRepository(PortalAccount);
        event.entity.accountId = `ACCT${zeroFills(6, event.entity.accountIdSequence)}`;
        return portalAccountRepo.save(event.entity);
    }
}
