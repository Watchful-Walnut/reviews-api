const {MongoClient} = require('mongodb');

const url = 'mongodb://mongodb:27017';
const client = new MongoClient(url);

const dbName = 'sdc'

const connect = async () => {
  await client.connect();
  return `Successfully connected to MongoDB`;
};

connect()
  .then(console.log)
  .catch(console.error);

const db = client.db(dbName);
const collection = db.collection('reviews');
const counters = db.collection('counters');

module.exports = {
  client: client,
  db: db,
  collection: collection,
  counters: counters
};