const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const getDb = require('../util/database_connection.js').getDb;

class Product {
    constructor(productName, price, imageUrl, description, id, userId) {
        this.productName = productName;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this._id = id ? new ObjectId(id) : null;
        this.userId = userId;
    }
    save() {
        const db = getDb();
        let dbOperation;
        if (this._id) {
            //Update the product
            dbOperation = db
                .collection('products')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOperation = db.collection('products')
                .insertOne(this)
        }
        return dbOperation
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .toArray()
            .then((products) => {
                //console.log(products);
                return products;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    static findById(productId) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: new ObjectId(productId) })
            .next() //this method is required when we get imn return a cursor so that we can choose next returned result
            .then((product) => {
                //console.log(product);
                return product;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    static deleteById(productId) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({ _id: new ObjectId(productId) })
            .then((product) => {
                //console.log("PRODUCT DELETED !!!");
                //return product;
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

// const Product = connectionPool.define('product',
//     {
//         id: {
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true
//         },
//         productName: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         price: {
//             type: Sequelize.DOUBLE,
//             allowNull: false
//         },
//         imageUrl: {
//             type: Sequelize.STRING,
//             allowNull: false
//         },
//         description: {
//             type: Sequelize.STRING,
//             allowNull: false
//         }
//     });

module.exports = Product;