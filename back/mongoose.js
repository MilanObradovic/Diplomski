// Connection URI
const uri = "mongodb+srv://milansd61:sifrazadb@weather.defnhzb.mongodb.net/WeatherDB?retryWrites=true&w=majority";

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('jeeej');
}).catch(() => {
    console.log('neeee')
});

// mongoose.set('useCreateIndex', true);
// mongoose.set('strictQuery', true);

module.exports = {
    mongoose
};

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://milansd61:sifrazadb@weather.defnhzb.mongodb.net/?retryWrites=true&w=majority";
//
// const mongoDB = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// mongoDB.connect(err => {
//     console.log('connected')
//     // const collection = mongoDB.db("test").collection("devices");
//     // perform actions on the collection object
// });
//
// module.exports = {
//     mongoDB
// };


// const { MongoClient } = require("mongodb");

// const uri = "mongodb+srv://milansd61:sifrazadb@weather.defnhzb.mongodb.net?retryWrites=true&w=majority";


// Create a new MongoClient
// const client = new MongoClient(uri);
//
// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();
//
//         // Establish and verify connection
//         // await client.db("admin").command({ ping: 1 });
//         console.log("Connected successfully to server");
//         const users = client.db('test').collection("Users");
//         const result = users.find({'username': 'milan'});
//         const nesto = await result.toArray()
//         console.log({nesto})
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // console.log("Closing connection to db server");
//         // await client.close();
//     }
// }
// run().catch(console.dir);
