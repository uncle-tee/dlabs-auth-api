/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 14/02/2020 */
export class ClassInstanceFactory {
    static create<T>(type: (new () => T)): T {
        return new type();
    }
}

