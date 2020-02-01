import {EntityRepository, Repository} from 'typeorm';
import {PortalUser} from '../domain/entity/PortalUser';
import {BaseRepository} from '../d-labs-common/dao/BaseRepository';
import {App} from '../domain/entity/App';
import {PortalUserAccount} from '../domain/entity/PortalUserAccount';
import {PortalAccount} from '../domain/entity/PortalAccount';

@EntityRepository(PortalUser)
export class PortalUserRepository extends BaseRepository<PortalUser> {
    queryPortalUserUserNameByApp(username: string, app: App, portalAccount?: PortalAccount) {
        const portalUserSelectQueryBuilder = this.createQueryBuilder('portalUser')
            .select()
            .innerJoin(PortalUserAccount, 'portalUserAccount', 'portalUserAccount.portalUser=portalUser.id')
            .innerJoin(PortalAccount, 'portalAccount', 'portalAccount.id=portalUserAccount.portalAccount')
            .innerJoin(App, 'app', 'app.id=portalAccount.app.id')
            .andWhere('app.id = :appId')
            .andWhere('portalUser.username = :username')
            .setParameter('username', username)
            .setParameter('appId', app.id);

        if (portalAccount) {
            portalUserSelectQueryBuilder
                .where('portalUserAccount.portalAccount = :portalAccount')
                .setParameter('portalAccount', portalAccount.id);
        }
        return portalUserSelectQueryBuilder.distinct(true);
    }

    findPortalUserUserNameByApp(username: string, app: App, portalAccount?: PortalAccount) {
        return this.queryPortalUserUserNameByApp(username, app, portalAccount).getMany();
    }

    countPortalUserUserNameByApp(username: string, app: App, portalAccount?: PortalAccount) {
        return this.queryPortalUserUserNameByApp(username, app, portalAccount).getCount();
    }

    queryEmailByApp(email: string, app: App, portalAccount?: PortalAccount) {
        const portalUserSelectQueryBuilder = this.createQueryBuilder('portalUser')
            .select()
            .innerJoin(PortalUserAccount, 'portalUserAccount', 'portalUserAccount.portalUser=portalUser.id')
            .innerJoin(PortalAccount, 'portalAccount', 'portalAccount.id=portalUserAccount.portalAccount')
            .innerJoin(App, 'app', 'app.id=portalAccount.app.id')
            .andWhere('app.id = :appId')
            .andWhere('portalUser.email = :email')
            .setParameter('email', email)
            .setParameter('appId', app.id);

        if (portalAccount) {
            portalUserSelectQueryBuilder
                .where('portalUserAccount.portalAccount = :portalAccount')
                .setParameter('portalAccount', portalAccount.id);
        }
        return portalUserSelectQueryBuilder.distinct(true);
    }

    countEmailByApp(email: string, app: App, portalAccount?: PortalAccount) {
        return this.queryEmailByApp(email, app, portalAccount).getCount();
    }

    findEmailByApp(email: string, app: App, portalAccount?: PortalAccount) {
        return this.queryEmailByApp(email, app, portalAccount).getMany();
    }
}
