/* -------------------------------------------------------------------------- */
/*                              Application Code                              */
/* -------------------------------------------------------------------------- */
import path from 'path';
import express from 'express'
import Database from './core/storage/MongoDb';
import session from 'express-session';
import appRouter from './Router';
import fs from 'fs';

const app = express();

const init = async () => {
    // Initialise
    await Database.init()
}

const main = () => {
    const __APP_DIR__ = path.dirname(fs.realpathSync(__filename))
    
    // Middleware: Parse incoming json + urlencoded body + multi part
    app.use(express.json())
    app.use(express.urlencoded())

    // Session
    app.use(session({secret:'strongest_key_in_the_world', name:'session' ,saveUninitialized:false}))

    // Public folder
    app.use(express.static(path.resolve(__APP_DIR__ ,'./public')))

    // Templating engine
    app.set('views', path.resolve(__APP_DIR__ ,'./views'))
    app.set('view engine', 'ejs')
    app.engine('.ejs', require('ejs').__express)

    // Setup router
    app.use('/', appRouter);

    var port = 3000
    console.log(`Application running at ${port}`)
    app.listen(port);
}

// Application
(async () => {
    await init()
    
    main()
})()