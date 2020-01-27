import {Address} from '../../domain/entity/Address';
import {Column, OneToOne} from 'typeorm';
import {Area} from '../../domain/entity/Area';

export class AddressDto {
    houseNumber: string;
    longitude: string;
    latitude: string;
    areaCode: string;

}
