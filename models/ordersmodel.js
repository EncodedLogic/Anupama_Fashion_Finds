const Sequelize = require('sequelize');

const connectionPool = require('../util/database_connection.js');

const Order = connectionPool.define('order',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    });

module.exports = Order;