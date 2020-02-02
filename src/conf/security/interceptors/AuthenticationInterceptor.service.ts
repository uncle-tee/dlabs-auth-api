import {CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AccessType} from '../accessTypes/AccessType';
import {AppRepository} from '../../../dao/AppRepository';
import {Reflector} from '@nestjs/core';

@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const publicAccesstypes = this.reflector.getAll(AccessType.PUBLIC, [
            context.getHandler(), context.getClass()
        ]);

        if (publicAccesstypes.includes(AccessType.PUBLIC)) {
            return next.handle();
        }

        throw new UnauthorizedException('Client is not authorised to access this route');
        // const header = context.switchToHttp().getRequest().body;
        //
        // return next.handle();
    }

}
