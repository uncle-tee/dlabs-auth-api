import {IsArray, IsNotEmpty, IsString} from 'class-validator';

export class RoleDto {

    @IsString({
        message: 'Role can only be a string'
    })
    @IsNotEmpty({
        message: 'Name of role must be provided'
    })
    name: string;
    @IsArray()
    @IsNotEmpty()
    permissionCodes: string[];

    @IsNotEmpty({
        message: 'Role description must be provided'
    })
    description: string;
}
