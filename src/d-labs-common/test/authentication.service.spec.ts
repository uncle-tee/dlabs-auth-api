import {Test, TestingModule} from '@nestjs/testing';
import {AuthenticationUtils} from '../authentication-utils.service';
import {WinstonModule} from 'nest-winston';

describe('AuthenticationService', () => {
    let service: AuthenticationUtils;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthenticationUtils],
            imports: [
                WinstonModule.forRoot({})
            ]
        }).compile();

        service = module.get<AuthenticationUtils>(AuthenticationUtils);
    });

    it('Test compare password', async () => {
        expect(service).toBeDefined();
        const hashedPassword = await service.comparePassword('Tobi', '$2a$10$JSdFE5BgElyZ.JVLM4b8Je1NskyWk3Vlx2lHmq1IP3iWeRzdjuhNa');
        expect(hashedPassword).toEqual(true);
    });
});
