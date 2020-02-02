import {Body, Controller, Post} from '@nestjs/common';
import {AuthenticationUtils} from '../../d-labs-common/authentication-utils.service';
import {AuthenticationService} from '../../service/AuthenticationService';
import {PortalUserDto} from '../../dto/portalUser/PortalUserDto';
import {Public} from '../../conf/security/annotations/public';
import {App} from '../../domain/entity/App';
import {App as Application} from '../decorators/App';
import {Request} from 'express';

@Controller()
export class AuthenticationController {

    constructor(private readonly authenticationUtils: AuthenticationUtils,
                private readonly authenticationService: AuthenticationService) {
    }

    @Post('/signUp')
    @Public()
    public async signUpUser(@Body() portalUser: PortalUserDto, @Application() app: App) {
        const portalUser1 = await this.authenticationService.signUpUser(portalUser, app);
        portalUser1.password = null;
        return portalUser1;
    }
}
