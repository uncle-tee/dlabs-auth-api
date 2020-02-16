/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import {EntityFactoryBuilder} from './contracts/EntityFactoryBuilder';
import FakerStatic = Faker.FakerStatic;
import {EntityManager} from 'typeorm';
import {FunctionalInterface} from './contracts/FunctionalInterface';
import {FactoryHelper} from './contracts/FactoryHelper';
import {ModelFactory} from './contracts/ModelFactory';
import {FactoryInstantiationException} from './exceptions/FactoryInstantiationException';

export class EntityFactoryBuilderImpl<T> implements EntityFactoryBuilder<T> {

    private operator: FunctionalInterface<T, T>;

    constructor(private factoryTag: string,
                private definitions: Map<any, FactoryHelper<T>>,
                private faker: FakerStatic,
                private modelFactory: ModelFactory,
                private entityManager: EntityManager) {
    }

    private makeInstance(): T {
        if (!this.definitions.has(this.factoryTag)) {
            throw new FactoryInstantiationException(`Unable to locate the factory with tag ${this.factoryTag}, Did you register it`);
        }
        const func: FactoryHelper<T> = this.definitions.get(this.factoryTag);

        return func.apply(this.faker, this.modelFactory);

    }

    async create(): Promise<T> {
        const entities: T[] = await this.createMany(1);
        return entities[0];

    }

    createMany(count: number): Promise<T[]> {
        const persistedInstances = this.makeMany(count).map(async instance => {
            // return this.entityManager.save(instance);
            return instance;
        });
        return Promise.all(persistedInstances);
    }

    public makeMany(count: number): T[] {
        const instances: T[] = [];
        for (let i = 0; i < count; i++) {
            instances.push(this.make());
        }

        return instances;
    }

    public make(): T {
        if (this.operator != null) {
            return this.operator.apply(this.makeInstance());
        }
        return this.makeInstance();
    }

}

