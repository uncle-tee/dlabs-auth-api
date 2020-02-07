import {SequenceGeneratorImpl} from '../../conf/sequence/SequenceGeneratorImpl';
import {Injectable} from '@nestjs/common';
import {Connection, EntityManager} from 'typeorm';
import {zeroFills} from '../../d-labs-common/UsefulUtils';

@Injectable()
export class AppIdSequenceGenerator extends SequenceGeneratorImpl {

    constructor(private readonly connection: Connection) {
        super('app_id', connection.createEntityManager());
    }

    async next(): Promise<string> {
        const nextLong = this.nextLong();
        return `APP${zeroFills(nextLong, 6)}`;
    }
}
