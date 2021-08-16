import express from 'express'
import appRouter from './Router'
import fs from 'fs';
import path from 'path';

const app = express();
const directory = path.dirname(fs.realpathSync(__filename))

// Middleware: Parse incoming json + urlencoded body
app.use(express.json())
app.use(express.urlencoded())

// Public folder
app.use(express.static(path.resolve(directory,'./public')))

// Templating engine
app.set('views', path.resolve(directory,'./views'))
app.set('view engine', 'ejs')
app.engine('.ejs', require('ejs').__express)

// Setup router
app.all('*', appRouter);

var port = 3000
console.log(`Application running at ${port}`)
app.listen(port);
