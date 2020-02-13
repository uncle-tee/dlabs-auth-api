import {SequenceGeneratorImpl} from '../../conf/sequence/SequenceGeneratorImpl';
import {Connection} from 'typeorm';
import {zeroFills} from '../../d-labs-common/UsefulUtils';
import {Injectable} from '@nestjs/common';

@Injectable()
export class RoleCodeSequenceGenerator extends SequenceGeneratorImpl {

    constructor(private readonly connection: Connection) {
        super('portal_account_id', connection.createEntityManager());
    }

    async next(): Promise<string> {
        const long = await this.nextLong();
        // tslint:disable-next-line:no-console
        return `ROLE${zeroFills(long, 10)}`;
    }
}
