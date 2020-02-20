/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import FakerStatic = Faker.FakerStatic;
import {FactoryHelper} from './contracts/FactoryHelper';
import {EntityFactoryBuilderImpl} from './EntityFactoryBuilderImpl';
import {EntityFactoryBuilder} from './contracts/EntityFactoryBuilder';
import {ModelFactory} from './contracts/ModelFactory';
import {OrmAdapter} from './contracts/OrmAdapter';

export class ModelFactoryImpl implements ModelFactory {
    private definitions: Map<string, any> = new Map<string, FactoryHelper<any>>();

    constructor(private faker: FakerStatic, private ormAdapter: OrmAdapter) {
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
        return new EntityFactoryBuilderImpl<T>(factoryTag, this.definitions, this.faker, this, this.ormAdapter);
    }

    public async make<T>(factoryTag: string): Promise<T> {
        return await this.of<T>(factoryTag).make();
    }

    public async makeMany<T>(count: number, factoryTag: string) {
        return await this.of<T>(factoryTag).makeMany(count);
    }

    createMany<T>(count: number, factoryTag: string): Promise<T[]> {
        return this.of<T>(factoryTag).createMany(count);
    }

    upset<Entity>(factoryTag: string): EntityFactoryBuilder<Entity> {
        return this.of<Entity>(factoryTag);
    }

}
