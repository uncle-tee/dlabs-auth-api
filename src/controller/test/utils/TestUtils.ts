import {Connection} from 'typeorm';
import {App} from '../../../domain/entity/App';
import * as faker from 'faker';
import {AppRepository} from '../../../dao/AppRepository';
import {PortalUserDto} from '../../../dto/portalUser/PortalUserDto';
import {AuthenticationService} from '../../../service/AuthenticationService';
import {GenderConstant} from '../../../domain/enums/GenderConstant';

export class TestUtils {

    constructor(private readonly connection: Connection) {
    }

    getAuthorisedApp() {
        const app = new App();
        app.code = faker.random.uuid();
        app.token = faker.random.uuid();
        app.name = faker.name.firstName();
        return this.connection.getCustomRepository(AppRepository).save(app);
    }

    async mockSignUpUser(authenticationService: AuthenticationService, app: App) {
        const portalUserDto = new PortalUserDto();
        portalUserDto.username = faker.name.firstName();
        portalUserDto.phoneNumber = '08162507399';
        portalUserDto.email = 'tadenekan@gmail.com';
        portalUserDto.gender = GenderConstant.MALE;
        portalUserDto.lastName = 'adenekan';
        portalUserDto.firstName = 'oluwatobi';
        portalUserDto.password = 'school';
        await authenticationService.signUpUser(portalUserDto, app);
        return portalUserDto;

    }
}
