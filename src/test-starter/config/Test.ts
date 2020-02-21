/* Oluwatobi Adenekan,mailtobi@dlabs.cloud 21/02/2020 */

export class Test {

    private static container: {
        [key: string]: any
    } = {};

    public static bind(key: string, value: any) {
        Test.container[key] = value;
    }

    public static resolve(key: string) {
        // tslint:disable-next-line:no-console
        console.log(this.container);
        return Test.container[key];
    }
}

