import {IsString} from 'class-validator';

export class RolePermissionDto {
    @IsString()
    roleName: string;
    permissionId: string[];
}
