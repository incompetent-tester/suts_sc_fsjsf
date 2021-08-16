import { Collection, Db, Document, MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

var _collection: Collection<Document>
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