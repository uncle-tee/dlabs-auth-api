import {Injectable} from '@nestjs/common';
import {Connection} from 'typeorm';
import {App} from './domain/entity/App';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
