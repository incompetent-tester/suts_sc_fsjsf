import express from 'express'
import Database from './core/storage/MongoDb';
import { generateJWT } from './core/auth/AuthJWT';
import { ObjectId } from 'mongodb';
import * as passport from 'passport'

const apiRouter = express.Router()

export default apiRouter

/* -------------------------------------------------------------------------- */
/*                              Authorised Routes                             */
/* -------------------------------------------------------------------------- */

apiRouter.get('/baskets', passport.authenticate('jwt', { session: false }), async (_, res) => {
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

    res.json({status: true, data : basketsWithUsersNProducts})
})

apiRouter.get('/products', passport.authenticate('jwt', { session: false }),async (_, res) => {
    const products = await Database.collection().find({ type: "product" }).toArray()
    res.json({status: true, data : products})
})


apiRouter.get('/users/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    var id : ObjectId = new ObjectId()

    if(ObjectId.isValid(req.params.id)){
        id = new ObjectId(req.params.id)
    }

    const users = await Database.collection().find({ type: "user", _id : id }, {projection : {password : 0}}).toArray()
    res.json({status: true, data : users})
})

apiRouter.delete('/users/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    var id : ObjectId = new ObjectId()

    if(ObjectId.isValid(req.params.id)){
        id = new ObjectId(req.params.id)
    }

    await Database.collection().findOneAndDelete({ type: "user", _id : id })
    res.json({status: true})
})

apiRouter.get('/users', passport.authenticate('jwt', { session: false }), async (_, res) => {
    const users = await Database.collection().find({ type: "user" }, {projection : {password : 0}}).toArray()
    res.json({ status: true, data: users })
})

apiRouter.post('/users', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let name = req.body.name
    let address = req.body.address
    let image =  req.body.image

    let doc = {
        _id : new ObjectId(),
        type: "user",
        name: name,
        address: address,
        image: image
    };

    await Database.collection().insertOne(doc)

    res.json({ status: true})
})

apiRouter.get('/logout', passport.authenticate('jwt', { session: false }), async (_, res) => {
    res.json({ status: true})
})

/* -------------------------------------------------------------------------- */
/*                               Non authorised                               */
/* -------------------------------------------------------------------------- */
apiRouter.post('/login', (req: express.Request, res) => {
    let username = req.body.username?.trim()
    let password = req.body.password
   
    if (username === 'admin' && password === 'admin') {
        res.json({ status: true, token: generateJWT() })
    } else {
        res.status(401).json({ status : false})
    }
})
