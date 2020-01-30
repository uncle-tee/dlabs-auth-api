import {CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Logger} from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(@Inject('winston') private readonly logger: Logger) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // tslint:disable-next-line:no-console
        console.log(context.switchToHttp().getRequest().body);
        return next.handle();
    }
}
