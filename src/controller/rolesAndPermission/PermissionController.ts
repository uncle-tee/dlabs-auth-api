import {Body, Controller, Post} from '@nestjs/common';
import {PermissionDto} from '../../dto/rolesAndPermission/PermissionDto';
import {App as Application} from '../decorators/App';
import {App} from '../../domain/entity/App';
import {PermissionService} from '../../service/PermissionService';
import {Public} from '../../conf/security/annotations/public';

@Controller('permissions')
export class PermissionController {

    constructor(private readonly permissionService: PermissionService) {
    }

    @Post()
    @Public()
    async createPermission(@Body() permission: PermissionDto, @Application() app: App) {
        await this.permissionService.createPermission(permission, app);
    }

}

