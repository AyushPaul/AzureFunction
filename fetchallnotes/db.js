const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");

const mongoURI = "mongodb+srv://admin:admin@cluster0.3pvgtxc.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI)
//     const client = new MongoClient(mongoURI);
//     await client.connect();
//     const dbName = "myDatabase";
//     const collectionName = "notes";

//   // Create references to the database and collection in order to run
//   // operations on them.
//   const database = client.db(dbName);
//   const collection = database.collection(collectionName);

}

module.exports = connectToMongo;