const cookieSession = require('cookie-session');
import * as express from "express";
import 'express-async-errors';
import * as cors from 'cors'
import { errorHandler } from "./middlewares/error-handler";
import { json } from 'body-parser';
import { NotFoundError } from './errors/not-found-error';
import { routes } from "./routes/v1";

const app = express();
const corsOption = {
    origin: ['http://localhost:5173','http://localhost:3050',''],
    credentials: true,
};
app.use(cors(corsOption));
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax'
    }))

app.use('/v1', routes);

app.all('*', (req, res, next) => {
    next(new NotFoundError());
});
app.use(errorHandler);

export { app };