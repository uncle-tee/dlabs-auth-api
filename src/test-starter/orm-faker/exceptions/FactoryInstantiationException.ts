/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 15/02/2020 */
export class FactoryInstantiationException extends Error {
    name: string;

    constructor(message: string) {
        super(message);
    };
}

