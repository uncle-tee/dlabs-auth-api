import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RoleDto} from '../../dto/rolesAndPermission/RoleDto';
import {RequestPrincipal} from '../../conf/security/requestPrincipal/RequestPrincipal';
import {Principal} from '../../conf/security/requestPrincipal/Principal';
import {RoleService} from '../../service/RoleService';
import {AppContext} from '../decorators/AppContext';
import {App} from '../../domain/entity/App';
import {RoleRepository} from '../../dao/RoleRepository';
import {Connection} from 'typeorm';
import {PermissionRepository} from '../../dao/PermissionRepository';
import {GenericStatusConstant} from '../../domain/enums/GenericStatusConstant';
import {PermissionResponse} from '../../dto/rolesAndPermission/PermissionResponse';
import {RoleResponseDto} from '../../dto/rolesAndPermission/RoleResponseDto';

@Controller('role-management/roles')
export class RolesController {

    constructor(private readonly roleService: RoleService, private readonly connection: Connection) {
    }

    @Post()
    public async createRole(@Body() role: RoleDto, @RequestPrincipal() requestPrincipal: Principal, @AppContext() app: App) {
        await this.roleService.createRole(role, requestPrincipal, app);
    }

    @Get('/:code')
    public async getRoles(@Param('code') code: string, @AppContext() app: App) {
        const role = await this.connection.getCustomRepository(RoleRepository).findOneItem({
            code,
            app
        });
        const permissions = await this.connection.getCustomRepository(PermissionRepository)
            .findByRole(role, app, GenericStatusConstant.ACTIVE);
        const roleResponseDto = new RoleResponseDto();
        roleResponseDto.name = role.name;
        roleResponseDto.code = role.code;
        roleResponseDto.description = role.description;
        roleResponseDto.permissions = permissions.map(permission => {
            const permissionResponse = new PermissionResponse();
            permissionResponse.name = permission.name;
            permissionResponse.code = permission.code;
            return permissionResponse;
        });
        return roleResponseDto;
    }
}
