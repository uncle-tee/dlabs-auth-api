import {PortalUser} from '../../../domain/entity/PortalUser';
import * as cls from 'cls-hooked';
import * as uuid from 'uuid/v4';
import {ParseUUIDPipe} from '@nestjs/common';
import {PortalAccount} from '../../../domain/entity/PortalAccount';

export class Principal {
    portalUser: PortalUser;
    ip: string;
    accounts: PortalAccount[];

    constructor(portalUser: PortalUser, ip: string) {
        this.portalUser = portalUser;
        this.ip = ip;
    }

}
