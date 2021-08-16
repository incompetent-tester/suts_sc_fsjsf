import { Collection, Db, MongoClient, Document as DBDocument } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

var _collection: Collection<DBDocument>
var db : Db 

const collection = () => _collection

const init = async () => {
    await client.connect()
    db = client.db('short_course')
    _collection = db.collection('raw')
}

const Database = {
    init: init,
    collection: collection
}

export default Database