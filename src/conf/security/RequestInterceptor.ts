import {CanActivate, ExecutionContext, Inject, Injectable, NestInterceptor, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../service/AuthenticationService';
import {Reflector} from '@nestjs/core';
import {Logger} from 'winston';
import {map, tap} from 'rxjs/operators';
import {App} from '../../domain/entity/App';
import {AccessType} from './accessTypes/AccessType';

@Injectable()
export class RequestInterceptor implements NestInterceptor {

    constructor(private readonly authenticationService: AuthenticationService,
                private readonly reflector: Reflector,
                @Inject('winston') private readonly logger: Logger) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // tslint:disable-next-line:no-console
        console.log('Starting up interceptor');

        const publicAccesstyps = this.reflector.getAll(AccessType.PUBLIC, [
            context.getHandler(), context.getClass()
        ]);


        if (publicAccesstyps.includes(AccessType.PUBLIC)) {
            return next.handle();
        }
        const request = context.switchToHttp().getRequest().body;
        const app = new App();
        app.token = '12345';
        request.app = app;
        return  next.handle();

       /* return next.handle().pipe(
            tap(() => {
                // tslint:disable-next-line:no-console
                console.log('context', context.switchToHttp().getRequest());
            }),
            map((data) => {
                const request = context.switchToHttp().getRequest().body;
                // tslint:disable-next-line:no-console
                console.log('request log', request);

                const app = new App();
                app.token = '12345';
                request.app = app;
                return data;
            })
        );*/
    }

}
