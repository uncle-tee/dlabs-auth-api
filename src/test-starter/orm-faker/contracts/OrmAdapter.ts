/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 18/02/2020 */
import Any = jasmine.Any;

export interface OrmAdapter {
    save<T>(entity: T): Promise<T>;
}

