import express from 'express';
import Database from './core/storage/MongoDb';
import { AuthorisedOnly } from './core/helper/AuthHelper';
import { ObjectId } from 'mongodb';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const appRouter = express.Router()

const __APP_DIR__ = path.dirname(fs.realpathSync(__filename))
const upload = multer({ dest: path.resolve(__APP_DIR__ ,'./uploads/')})

export default appRouter

/* -------------------------------------------------------------------------- */
/*                              Authorised Routes                             */
/* -------------------------------------------------------------------------- */

appRouter.get('/about', AuthorisedOnly, (_, res) => {
    res.render('pages/about')
})

appRouter.get('/baskets', AuthorisedOnly, async (_, res) => {
    const basketsWithUsersNProducts = await Database.collection().aggregate([
        { $match: { type: 'basket' } },
        {
            $lookup:
            {
                from: 'raw',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
            }
        },
        {
            $lookup:
            {
                from: 'raw',
                localField: 'pid',
                foreignField: '_id',
                as: 'productDetails'
            }
        },
        { $unwind: '$pid' },
        { $unwind: '$quantity' },
        { $unwind: '$userDetails' },
        { $unwind: '$productDetails' },
        {
            $group: {
                _id: new ObjectId(),
                basket: { $push: { pid: '$pid', quantity: '$quantity', productDetails: '$productDetails' } },
                user: { $first: '$userDetails' }
            }
        }
    ]).toArray()

    res.render('pages/basket', { data: basketsWithUsersNProducts })
})

appRouter.get('/products', AuthorisedOnly, async (_, res) => {
    const products = await Database.collection().find({ type: "product" }).toArray()
    res.render('pages/products', { products: products })
})


appRouter.get('/users/:id', AuthorisedOnly, async (req, res) => {
    var id : ObjectId = new ObjectId()

    if(ObjectId.isValid(req.params.id)){
        id = new ObjectId(req.params.id)
    }

    const users = await Database.collection().find({ type: "user", _id : id }).toArray()
    res.render('pages/users', { users: users })
})

appRouter.post('/users/delete/:id', AuthorisedOnly, async (req, res) => {
    var id : ObjectId = new ObjectId()

    if(ObjectId.isValid(req.params.id)){
        id = new ObjectId(req.params.id)
    }

    await Database.collection().findOneAndDelete({ type: "user", _id : id })
    res.redirect('/users')
})

appRouter.get('/users', AuthorisedOnly, async (_, res) => {
    const users = await Database.collection().find({ type: "user" }).toArray()
    res.render('pages/users', { users: users })
})

appRouter.post('/users', AuthorisedOnly, upload.single('profile'), async (req, res) => {
    if(req.file){
        let name = req.body.name
        let address = req.body.address
        let image =  fs.readFileSync(req.file.path).toString('base64');

        let doc = {
            _id : new ObjectId(),
            type: "user",
            name: name,
            address: address,
            image: image
        };

        await Database.collection().insertOne(doc)

        fs.rmSync(req.file.path)
    }

    res.redirect('/users')
})

appRouter.get('/', AuthorisedOnly, (_, res) => {
    res.render('pages/index')
})

appRouter.get('/logout', AuthorisedOnly, async (req, res) => {
    req.session.authUser = undefined
    res.redirect('/login')
})

/* -------------------------------------------------------------------------- */
/*                               Non authorised                               */
/* -------------------------------------------------------------------------- */
appRouter.get('/login', (req, res) => {
    let errorMsg = undefined

    if (req.query.error) {
        errorMsg = req.query.error
    }

    res.render('pages/login', { error: errorMsg })
})

appRouter.post('/login', (req: express.Request, res) => {
    let username = req.body.username.trim()
    let password = req.body.password

    if (username === 'admin' && password === 'admin') {

        req.session.authUser = {
            name: 'Admin',
            profileImage: ''
        }

        res.redirect('/')
    } else {
        res.redirect('/login?error=Invalid credentials')
    }
})


