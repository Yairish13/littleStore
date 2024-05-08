import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface SessionData {
    jwt?: string;
}
interface Payload {
    id: string
    iat: number | string
    exp: number | string
}
declare global {
    namespace Express {
        interface Request {
            session: SessionData;
            currentUser?: Payload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {        
        return next();
    }
    try {
        const payload = jwt.verify(
            req.session?.jwt,
            process.env.JWT_KEY!
        ) as Payload;

        req.currentUser = payload;
    } catch (err) {
        next(new Error(`${err.message}`))
    }
    next();
}