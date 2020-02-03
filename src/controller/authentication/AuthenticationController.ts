import {Body, Controller, Post} from '@nestjs/common';
import {AuthenticationUtils} from '../../d-labs-common/authentication-utils.service';
import {AuthenticationService} from '../../service/AuthenticationService';
import {PortalUserDto} from '../../dto/portalUser/PortalUserDto';
import {Public} from '../../conf/security/annotations/public';
import {App} from '../../domain/entity/App';
import {App as Application} from '../decorators/App';
import {Request} from 'express';
import {LoginDto} from '../../dto/auth/LoginDto';
import {LoginResponse} from '../../dto/auth/LoginResponse';

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

    @Post('/login')
    @Public()
    public async loginUser(@Body() loginDto: LoginDto, @Application() app: App) {
        const token = await this.authenticationService.loginUser(loginDto, app);
        const response = new LoginResponse();
        response.token = token;
        return response;

    }
}
