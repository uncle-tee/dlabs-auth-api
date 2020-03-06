/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import {FactoryHelper} from './FactoryHelper';
import {EntityFactoryBuilder} from './EntityFactoryBuilder';

export interface ModelFactory {
    create<T>(factoryTag: string): Promise<T>;

    register<Entity, Mocker extends FactoryHelper<Entity>>(type: (new () => Mocker));

    createMany<T>(count: number, factoryTag: string): Promise<T[]>;

    upset<Entity>(factoryTag: string): EntityFactoryBuilder<Entity>;

    makeMany<T>(count: number, factoryTag: string): Promise<T[]>;

    make<T>(factoryTag: string): Promise<T>;

}
