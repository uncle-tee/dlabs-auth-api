import {Body, Controller, Post} from '@nestjs/common';
import {RoleDto} from '../../dto/rolesAndPermission/RoleDto';
import {RequestPrincipal} from '../../conf/security/requestPrincipal/RequestPrincipal';
import {Principal} from '../../conf/security/requestPrincipal/Principal';
import {RoleService} from '../../service/RoleService';

@Controller('role-management/roles')
export class RolesController {

    constructor(private readonly roleService: RoleService) {
    }

    @Post()
    public async createRole(@Body() role: RoleDto, @RequestPrincipal() requestPrincipal: Principal) {
        await this.roleService.createRole(role, requestPrincipal);
    }
}
