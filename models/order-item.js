const Sequelize = require('sequelize');

const connectionPool = require('../util/database_connection.js');

const OrderItem = connectionPool.define('orderItem',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: Sequelize.INTEGER
    });

module.exports = OrderItem;