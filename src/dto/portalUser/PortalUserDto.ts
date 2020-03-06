import {PortalUser} from '../../domain/entity/PortalUser';
import {Column, OneToOne} from 'typeorm';
import {GenderConstant} from '../../domain/enums/GenderConstant';
import {Address} from '../../domain/entity/Address';
import {PortalAccount} from '../../domain/entity/PortalAccount';
import {AddressDto} from '../address/AddressDto';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class PortalUserDto {
    @IsNotEmpty({
        message: 'First name must be provided'
    })
    firstName: string;
    @IsNotEmpty({
        message: 'Last name must be provided'
    })
    lastName: string;
    @IsNotEmpty({
        message: 'username must be provided'
    })
    username: string;
    @IsNotEmpty({
        message: 'Gender must be provided'
    })
    gender: GenderConstant;
    @IsNotEmpty({
        message: 'Password must be provided'
    })
    password: string;
    confirmPassword: string;
    @IsEmail()
    email: string;
    phoneNumber: string;
    accountId: string; // When Account Id is Null create a new account ID
    // todo Create an is account Id Validation
}
