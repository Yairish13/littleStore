import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to DB';
    constructor() {
        super('Invalid params for request')

        //Only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {
                message :this.reason
            }
        ]
    }
}
