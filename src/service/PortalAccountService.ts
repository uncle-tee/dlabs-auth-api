import {Injectable} from '@nestjs/common';
import {PortalAccountDto} from '../dto/portalAccount/PortalAccountDto';
import {App} from '../domain/entity/App';
import {Connection} from 'typeorm';
import {PortalAccount} from '../domain/entity/PortalAccount';

@Injectable()
export class PortalAccountService {

    constructor(private readonly  connection: Connection) {
    }

    public createPortalAccount(portalAccountDto: PortalAccountDto, app: App) {
        const pAccount = new PortalAccount();
        pAccount.name = portalAccountDto.name;
        pAccount.accountId
    }
}
