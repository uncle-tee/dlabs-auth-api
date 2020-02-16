/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import FakerStatic = Faker.FakerStatic;

export interface FactoryFunction<T> {
    apply(faker: FakerStatic): T;
}

