import {Body, Controller, Post} from '@nestjs/common';
import {PermissionDto} from '../../dto/rolesAndPermission/PermissionDto';
import {AppContext as Application} from '../decorators/AppContext';
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
        return await this.permissionService.createPermission(permission, app);
    }

}

