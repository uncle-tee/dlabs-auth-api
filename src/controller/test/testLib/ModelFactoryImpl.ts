/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import {EntityManager} from 'typeorm';
import FakerStatic = Faker.FakerStatic;
import {FactoryHelper} from './contracts/FactoryHelper';
import {ClassInstanceFactory} from './ClassInstanceFactory';
import {EntityFactoryBuilderImpl} from './EntityFactoryBuilderImpl';
import {EntityFactoryBuilder} from './contracts/EntityFactoryBuilder';
import {ModelFactory} from './contracts/ModelFactory';

export class ModelFactoryImpl implements ModelFactory {

    private definitions: Map<string, any> = new Map<any, FactoryHelper<any>>();

    constructor(private faker: FakerStatic, private entityManager: EntityManager) {
    }

    public register<Entity, Mocker extends FactoryHelper<Entity>>(type: (new () => Mocker)) {
        this.define(type);
    }

    private define<Entity, Mocker extends FactoryHelper<Entity>>(type: (new () => Mocker)) {
        const factoryHelperInstance = new type();
        this.definitions.set(factoryHelperInstance.getTag(), factoryHelperInstance);
    }

    public create<T>(factoryTag: string): Promise<T> {
        return this.of<T>(factoryTag).create();
    }

    private of<T>(factoryTag: string): EntityFactoryBuilder<T> {
        return new EntityFactoryBuilderImpl<T>(factoryTag, this.definitions, this.faker, this, this.entityManager);
    }

    public make<T>(factoryTag: string): T {
        return this.of<T>(factoryTag).make();
    }

    public makeMany<T>(count: number, factoryTag: string): T[] {
        return this.of<T>(factoryTag).makeMany(count);
    }

    createMany<T>(count: number, factoryTag: string): Promise<T[]> {
        return this.of<T>(factoryTag).createMany(count);
    }

}
