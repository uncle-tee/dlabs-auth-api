import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Query} from '@nestjs/common';
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

    @Get()
    public async getRoles(@AppContext() app: App) {
        const roles = await this.connection.getCustomRepository(RoleRepository).findItem({
            app
        });
        return roles.map(role => {
            const roleResponseDto = new RoleResponseDto();
            roleResponseDto.description = role.description;
            roleResponseDto.code = role.code;
            roleResponseDto.name = role.name;
            return roleResponseDto;
        });
    }

    @Delete('/:code')
    public async deleteRole(@Param('code') code: string, @AppContext() app: App) {
        const roleRepository = this.connection.getCustomRepository(RoleRepository);
        const role = await roleRepository.findOneItem({
            code,
            app
        });
        if (!role) {
            throw new NotFoundException(`Role with code ${code} cannot be found`);
        }
        role.status = GenericStatusConstant.DELETED;
        await roleRepository.save(role);
    }

    @Get('/:code')
    public async getRole(@Param('code') code: string, @AppContext() app: App) {
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
