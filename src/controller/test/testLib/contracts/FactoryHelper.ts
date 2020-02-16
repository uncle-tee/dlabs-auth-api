/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import FakerStatic = Faker.FakerStatic;
import {ModelFactory} from './ModelFactory';

export interface FactoryHelper<T> {
    getTag(): string;

    apply(faker: FakerStatic, modelFactory: ModelFactory): T;
}
