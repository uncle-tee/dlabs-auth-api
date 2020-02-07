import {PortalUser} from '../../../domain/entity/PortalUser';
import * as cls from 'cls-hooked';
import * as uuid from 'uuid/v4';
import {ParseUUIDPipe} from '@nestjs/common';

export class Principal {
    portalUser: PortalUser;
    ip: string;

    constructor(portalUser: PortalUser, ip: string) {
        this.portalUser = portalUser;
        this.ip = ip;
    }

}
