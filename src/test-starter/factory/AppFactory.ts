/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 16/02/2020 */
import {FactoryHelper} from '../orm-faker/contracts/FactoryHelper';
import {App} from '../../domain/entity/App';
import {ModelFactory} from '../orm-faker/contracts/ModelFactory';

export class AppFactory implements FactoryHelper<App> {
    public static TAG: string = 'APP';

   async apply(faker: Faker.FakerStatic, modelFactory: ModelFactory): Promise<App> {
        const app = new App();
        app.name = faker.name.lastName();
        app.token = faker.random.uuid();
        app.code = faker.random.uuid();
        return app;

    }

    getTag(): string {
        return AppFactory.TAG;
    }

}

