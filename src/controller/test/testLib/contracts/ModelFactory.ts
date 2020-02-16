/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
import {FactoryHelper} from './FactoryHelper';

export interface ModelFactory {
    create<T>(factoryTag: string): Promise<T>;

    register<Entity, Mocker extends FactoryHelper<Entity>>(type: (new () => Mocker));

    createMany<T>(count: number, factoryTag: string): Promise<T[]>;

}

