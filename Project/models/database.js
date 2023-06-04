const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://127.0.0.1:27017/';
const dbName = 'myapp';

let db;

async function startServer(){
    const conn = await MongoClient.connect(mongoUrl,{useUnifiedTopology: true});
    console.log('Connected to Database!!');
    db = conn.db(dbName);
}

module.exports = {
  connect: () => startServer(),
  getDb: () => db,
};
