const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongodbConnection = (connectionCallback) => {
    MongoClient.connect('mongodb+srv://anandhu:3iW3QarSQVbzano6@clusternodejs.22sklqv.mongodb.net/shop?retryWrites=true&w=majority')
        .then((client) => {
            console.log('Connection Successful !!!');
            _db = client.db();
            connectionCallback();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found !!!';
}

exports.mongodbConnection = mongodbConnection;
exports.getDb = getDb;

// const Sequelize = require('sequelize');

// const connectionPool = new Sequelize('anupama_mart', 'root', 'password',
//     {
//         dialect: 'mysql',
//         host: 'localhost'
//     });

// module.exports = connectionPool;