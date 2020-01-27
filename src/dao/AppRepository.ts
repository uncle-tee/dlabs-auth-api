import {EntityRepository, Repository} from 'typeorm';
import {App} from '../domain/entity/App';
import {BaseRepository} from '../d-labs-common/dao/BaseRepository';

@EntityRepository(App)
export class AppRepository extends BaseRepository<App> {

}
