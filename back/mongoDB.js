// const mongoDB = require('mongoose');
//
// mongoDB.Promise = global.Promise;
// mongoDB.connect('mongodb://localhost:27017/pia', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log('jeeej');
// }).catch(() => {
//     console.log('neeee')
// });
//
// mongoDB.set('useCreateIndex', true);
// mongoDB.set('useFindAndModify', false);
//
// module.exports = {
//     mongoDB
// };

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://milansd61:sifrazadb@weather.defnhzb.mongodb.net/?retryWrites=true&w=majority";

const mongoDB = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
mongoDB.connect(err => {
    console.log('connected')
    // const collection = mongoDB.db("test").collection("devices");
    // perform actions on the collection object
});

module.exports = {
    mongoDB
};
