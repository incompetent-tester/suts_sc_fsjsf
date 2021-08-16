import express, { NextFunction } from 'express';

declare module 'express-session' {
    interface SessionData {
        views: number;
        authUser? : any
    }
}

export const AuthorisedOnly = (req: express.Request, res: express.Response, next: NextFunction) => {
    req.session.authUser ? next() : res.redirect('/login')
}


