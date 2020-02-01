import {PortalUser} from '../../domain/entity/PortalUser';
import {Column, OneToOne} from 'typeorm';
import {GenderConstant} from '../../domain/enums/GenderConstant';
import {Address} from '../../domain/entity/Address';
import {PortalAccount} from '../../domain/entity/PortalAccount';
import {AddressDto} from '../address/AddressDto';

export class PortalUserDto {
    firstName: string;
    lastName: string;
    username: string;
    gender: GenderConstant;
    password: string;
    confirmPassword: string;
    email: string;
    phoneNumber: string;
    portalAccountName: string; // When Account Id is Null create a new account ID
}
