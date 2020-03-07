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
import {PortalUserRepository} from '../../../dao/PortalUserRepository';
import {GenericStatusConstant} from '../../../domain/enums/GenericStatusConstant';

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

    /**
     * Mock a new user login noting that a new user will be inactive when created not until the user is active;
     * @param authenticationService
     * @param app
     */
    async mockNewSignUpUser(authenticationService: AuthenticationService, app: App): Promise<PortalUserDto> {
        const newUser = new PortalUserDto();
        newUser.username = faker.name.firstName();
        newUser.phoneNumber = faker.phone.phoneNumber();
        newUser.email = faker.internet.email();
        newUser.gender = GenderConstant.MALE;
        newUser.lastName = faker.name.lastName();
        newUser.firstName = faker.name.firstName();
        newUser.password = faker.random.uuid();
        await authenticationService.signUpUser(newUser, app);
        return newUser;
    }

    async mockNewUserLogin(authenticationService: AuthenticationService, app: App) {
        const portalUserDto = await this.mockNewSignUpUser(authenticationService, app);
        const loginDto = new LoginDto();
        loginDto.username = portalUserDto.username;
        loginDto.password = portalUserDto.password;
        return await authenticationService.loginUser(loginDto, app);
    }

    async mockActiveSignUpUser(authenticationService: AuthenticationService, app: App): Promise<PortalUserDto> {

        if (!this.portalUserDto) {
            this.portalUserDto = new PortalUserDto();
            this.portalUserDto.username = faker.name.firstName();
            this.portalUserDto.phoneNumber = faker.phone.phoneNumber();
            this.portalUserDto.email = faker.internet.email();
            this.portalUserDto.gender = GenderConstant.MALE;
            this.portalUserDto.lastName = faker.name.lastName();
            this.portalUserDto.firstName = faker.name.firstName();
            this.portalUserDto.password = faker.random.uuid();
            const portalUser = await authenticationService.signUpUser(this.portalUserDto, app);
            portalUser.status = GenericStatusConstant.ACTIVE;
            this.connection.getCustomRepository(PortalUserRepository).save(portalUser);

        }
        return this.portalUserDto;

    }

    async mockLoginUser(authenticationService: AuthenticationService, app: App) {
        const signUpUser = await this.mockActiveSignUpUser(authenticationService, app);
        const loginDto = new LoginDto();
        loginDto.username = signUpUser.username;
        loginDto.password = signUpUser.password;
        return await authenticationService.loginUser(loginDto, app);
    }

}
