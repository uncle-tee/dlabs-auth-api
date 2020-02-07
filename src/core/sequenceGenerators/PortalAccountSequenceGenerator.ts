import {Injectable} from '@nestjs/common';
import {SequenceGeneratorImpl} from '../../conf/sequence/SequenceGeneratorImpl';
import {Connection, EntityManager} from 'typeorm';
import {zeroFills} from '../../d-labs-common/UsefulUtils';

@Injectable()
export class PortalAccountSequenceGenerator extends SequenceGeneratorImpl {
    constructor(private readonly connection: Connection) {
        super('portal_account_id', connection.createEntityManager());
    }

    async next(): Promise<string> {
        const long = await this.nextLong();
        // tslint:disable-next-line:no-console
        return `ACT${zeroFills(long, 10)}`;
    }
}
