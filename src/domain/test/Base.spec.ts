import {BaseEntity} from '../entity/BaseEntity';
import {GenericStatusConstant} from '../enums/GenericStatusConstant';
import * as faker from 'faker';

describe('Test base entity to have all properties', () => {
    const baseEntity = new BaseEntity();
    baseEntity.id = faker.random.number();
    baseEntity.status = GenericStatusConstant.ACTIVE;
    baseEntity.createdAt = Date.prototype;
    baseEntity.updatedAt = Date.prototype;
    it('Base Entity', () => {
        expect(baseEntity).toHaveProperty('id');
        expect(baseEntity).toHaveProperty('status');
        expect(baseEntity).toHaveProperty('createdAt');
        expect(baseEntity).toHaveProperty('updatedAt');
    });
});
