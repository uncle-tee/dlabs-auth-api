/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 06/03/2020 */
import {PermissionResponse} from './PermissionResponse';

export class RoleResponseDto {
    name: string;
    code: string;
    description: string;
    permissions: PermissionResponse[];
}

