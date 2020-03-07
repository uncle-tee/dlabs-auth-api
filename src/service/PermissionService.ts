import {PermissionSequenceGenerator} from '../core/sequenceGenerators/PermissionSequenceGenerator';
import {Injectable} from '@nestjs/common';
import {PermissionDto} from '../dto/rolesAndPermission/PermissionDto';
import {Permission} from '../domain/entity/Permission';
import {Connection} from 'typeorm';
import {App} from '../domain/entity/App';
import {PermissionRepository} from '../dao/PermissionRepository';

@Injectable()
export class PermissionService {

    constructor(private readonly permissionSequenceGenerator: PermissionSequenceGenerator,
                private readonly connection: Connection) {
    }

    async createPermission(permission: PermissionDto, app: App) {

        return await this.connection.transaction(async (entityManager) => {
            const newPermission = new Permission();
            newPermission.name = permission.permissionName;
            newPermission.code = await this.permissionSequenceGenerator.next();
            newPermission.app = app;
            return entityManager.save(newPermission);
        });
    }

}
