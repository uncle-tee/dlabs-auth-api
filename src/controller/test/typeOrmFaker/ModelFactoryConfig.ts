/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import {EntityManager} from 'typeorm';
import FakerStatic = Faker.FakerStatic;
import {ModelFactory} from '../../../test-starter/orm-faker/contracts/ModelFactory';
import {ModelFactoryImpl} from '../../../test-starter/orm-faker/ModelFactoryImpl';

export class ModelFactoryConfig {
    private static instance: ModelFactory = null;

    private constructor() {
    }

    static getInstance(faker: FakerStatic, entityManager: EntityManager): ModelFactory {
        if (this.instance == null) {
            this.instance = new ModelFactoryImpl(faker, entityManager);
        }
        return this.instance;
    }
}

