export class Logger {
    static error(error: any) {
        console.error(JSON.stringify(error, null, 2));
    }

    static info(message: string) {
        console.log(message);
    }
} 