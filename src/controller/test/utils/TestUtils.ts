import {Connection} from 'typeorm';
import {App} from '../../../domain/entity/App';
import * as faker from 'faker';
import {AppRepository} from '../../../dao/AppRepository';
import {PortalUserDto} from '../../../dto/portalUser/PortalUserDto';
import {AuthenticationService} from '../../../service/AuthenticationService';
import {GenderConstant} from '../../../domain/enums/GenderConstant';
import {LoginDto} from '../../../dto/auth/LoginDto';
import {ModelFactory} from '../testLib/contracts/ModelFactory';
import {ModelFactoryConfig} from '../testLib/ModelFactoryConfig';
import {ModelFactoryRoster} from '../testLib/factory/ModelFactoryRoster';

export class TestUtils {

    constructor(private readonly connection: Connection) {
    }

    initModelFactory(): ModelFactory {
        // tslint:disable-next-line:no-console
        console.log('about to regsiter');
        const modelFactory = ModelFactoryConfig.getInstance(faker, this.connection.createEntityManager());
        // tslint:disable-next-line:no-console
        console.log('about to regsiter');
        ModelFactoryRoster.register(modelFactory);
        return modelFactory;
    }

    getAuthorisedApp() {
        const app = new App();
        app.code = faker.random.uuid();
        app.token = faker.random.uuid();
        app.name = faker.name.firstName();
        return this.connection.getCustomRepository(AppRepository).save(app);
    }

    // @ts-ignore
    async mockSignUpUser(authenticationService: AuthenticationService, app: App): PortalUserDto {
        const portalUserDto = new PortalUserDto();
        portalUserDto.username = faker.name.firstName();
        portalUserDto.phoneNumber = faker.phone.phoneNumber();
        portalUserDto.email = faker.internet.email();
        portalUserDto.gender = GenderConstant.MALE;
        portalUserDto.lastName = faker.name.lastName();
        portalUserDto.firstName = faker.name.firstName();
        portalUserDto.password = faker.random.uuid();
        await authenticationService.signUpUser(portalUserDto, app);
        return portalUserDto;
    }

    async mockLoginUser(authenticationService: AuthenticationService, app: App) {
        const signUpUser = this.mockSignUpUser(authenticationService, app);
        const loginDto = new LoginDto();
        loginDto.username = signUpUser.username;
        loginDto.password = signUpUser.password;
        return await authenticationService.loginUser(loginDto, app);

    }
}
