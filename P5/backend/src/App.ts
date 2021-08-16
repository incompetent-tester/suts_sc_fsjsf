import express from 'express'
import apiRouter from './Api'
import fs from 'fs';
import path from 'path';
import Database from './core/storage/MongoDb';
import { strategyJWT } from './core/auth/AuthJWT';
import * as passport from 'passport'

const app = express();

const directory = path.dirname(fs.realpathSync(__filename))

const init = async () => {
    // Initialise
    await Database.init()
}

const main = () => {
    // Middleware: Parse incoming json + urlencoded body
    app.use(express.json())
    app.use(express.urlencoded({extended : true}))

    // Enable JWT middleware
    passport.use(strategyJWT)
    app.use(passport.initialize())

    // Setup Router
    app.use('/api', apiRouter)

    // Everything else serve public folder
    app.use(express.static(path.resolve(directory, '../client/')));
    app.use('*', express.static(path.resolve(directory, '../client/')));
    
    var port = 3000
    console.log(`Application running at ${port}`)
    app.listen(port);
}

// Application
(async () => {
    await init()
    main()
})()