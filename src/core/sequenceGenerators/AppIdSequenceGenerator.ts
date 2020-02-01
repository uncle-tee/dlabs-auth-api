import {SequenceGeneratorImpl} from '../../conf/sequence/SequenceGeneratorImpl';
import {Injectable} from '@nestjs/common';
import {Connection, EntityManager} from 'typeorm';
import {zeroFills} from '../../d-labs-common/UsefulUtils';

@Injectable()
export class AppIdSequenceGenerator extends SequenceGeneratorImpl {

    constructor(private readonly connection: Connection) {
        super('app_id', connection.createEntityManager());
    }

    async next(entityManager: EntityManager): Promise<string> {
        const long = await this.nextLong(entityManager);
        return `APP${zeroFills(long, 6)}`;
    }
}
