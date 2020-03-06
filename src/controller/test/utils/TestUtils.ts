import {Connection} from 'typeorm';
import {App} from '../../../domain/entity/App';
import * as faker from 'faker';
import {AppRepository} from '../../../dao/AppRepository';
import {PortalUserDto} from '../../../dto/portalUser/PortalUserDto';
import {AuthenticationService} from '../../../service/AuthenticationService';
import {ModelFactoryConfig} from '../typeOrmFaker/ModelFactoryConfig';
import {ModelFactory} from '../../../test-starter/orm-faker/contracts/ModelFactory';
import {ModelFactoryRoster} from '../../../test-starter/factory/ModelFactoryRoster';
import {GenderConstant} from '../../../domain/enums/GenderConstant';
import {LoginDto} from '../../../dto/auth/LoginDto';

export class TestUtils {

    private static instance = null;
    private app = null;
    private portalUserDto = null;

    private constructor(private readonly connection: Connection) {

    }

    public static getInstance(connection: Connection): TestUtils {
        if (this.instance == null) {
            this.instance = new TestUtils(connection);
        }
        return this.instance;
    }

    initModelFactory(): ModelFactory {

        const modelFactory = ModelFactoryConfig.getInstance(faker, this.connection.createEntityManager());
        ModelFactoryRoster.register(modelFactory);
        return modelFactory;
    }

    async getAuthorisedApp(): Promise<App> {

        if (this.app == null) {
            this.app = new App();
            this.app.code = faker.random.uuid();
            this.app.token = faker.random.uuid();
            this.app.name = faker.name.firstName();
            this.app = await this.connection
                .getCustomRepository(AppRepository)
                .save(this.app);
        }

        return this.app;

    }

    async mockNewSignUpUser(authenticationService: AuthenticationService, app: App): Promise<PortalUserDto> {
        this.portalUserDto = null;
        return this.mockSignUpUser(authenticationService, app);
    }

    async mockSignUpUser(authenticationService: AuthenticationService, app: App): Promise<PortalUserDto> {

        if (!this.portalUserDto) {
            this.portalUserDto = new PortalUserDto();
            this.portalUserDto.username = faker.name.firstName();
            this.portalUserDto.phoneNumber = faker.phone.phoneNumber();
            this.portalUserDto.email = faker.internet.email();
            this.portalUserDto.gender = GenderConstant.MALE;
            this.portalUserDto.lastName = faker.name.lastName();
            this.portalUserDto.firstName = faker.name.firstName();
            this.portalUserDto.password = faker.random.uuid();
            await authenticationService.signUpUser(this.portalUserDto, app);
        }
        return this.portalUserDto;

    }

    async mockLoginUser(authenticationService: AuthenticationService, app: App) {
        const signUpUser = await this.mockSignUpUser(authenticationService, app);
        const loginDto = new LoginDto();
        loginDto.username = signUpUser.username;
        loginDto.password = signUpUser.password;
        return await authenticationService.loginUser(loginDto, app);

    }
}
