import {Controller, Get} from '@nestjs/common';
import {AuthenticationUtils} from '../../d-labs-common/authentication-utils.service';

@Controller('auth')
export class AuthenticationController {

    constructor(private readonly authenticationUtils: AuthenticationUtils) {
    }

    @Get()
    public testAuthUtils(): Promise<string> {
        return this.authenticationUtils.hashPassword('Tobi');
    }

}
