import {FindConditions, Repository} from 'typeorm';
import {GenericStatusConstant} from '../../domain/enums/GenericStatusConstant';
import {BaseEntity} from '../../domain/entity/BaseEntity';

export abstract class BaseRepository<T extends BaseEntity> extends Repository<T> {

    findItem(findOptions: FindConditions<T>, status: GenericStatusConstant = GenericStatusConstant.ACTIVE): Promise<T[]> {
        const statusVal = {status};
        return this.find({
            where: {...findOptions, ...statusVal}
        });
    }

    findOneItem(findOptions: FindConditions<T>, status: GenericStatusConstant = GenericStatusConstant.ACTIVE): Promise<T> {

        return this.findOne({
            where: {...findOptions, ...{status}}
        });
    }

}
