import {IsArray, IsNotEmpty, IsString} from 'class-validator';

export class RoleDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    @IsArray()
    @IsNotEmpty()
    permissionCodes: string[];
}
