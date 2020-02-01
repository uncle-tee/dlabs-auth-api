import {PortalAccount} from '../../domain/entity/PortalAccount';
import {Column, OneToOne} from 'typeorm';
import {App} from '../../domain/entity/App';

export class PortalAccountDto {
    name: string;
    accountId: string;
}
